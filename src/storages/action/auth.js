import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {instance} from '../../utils/serviceApi';
import {Toast} from 'react-native-toast-notifications';

const base_url = 'https://determined-pink-foal.cyclic.app/';

export const postLogin = data => async (dispatch, getState) => {
  try {
    dispatch({type: 'LOGIN_REQUEST'});
    const result = await axios.post(base_url + `auth/login`, data);
    console.log('result data ', result.data);
    await AsyncStorage.setItem('token', result.data.token);
    result.data && Toast.show(result.data.msg);
    result.data && dispatch({type: 'LOGIN_SUCCESS', payload: result.data});
    result.data && console.log('success');
  } catch (err) {
    Toast.show(err.response.data.msg);
    dispatch({type: 'LOGIN_ERROR', payload: err.response.data.msg});
  }
};
export const postRegister = (data, navigate) => async (dispatch, getState) => {
  try {
    dispatch({type: 'REGISTER_REQUEST'});
    const result = await axios.post(base_url + `auth/register`, data);
    console.log('result data ', result.data);
    Toast.show(result.data.msg);
    navigate.navigate('Login');
    result.data &&
      dispatch({type: 'REGISTER_SUCCESS', payload: result.data.msg});
    result.data && console.log('success');
  } catch (err) {
    Toast.show(err.response.data.msg);
    dispatch({type: 'REGISTER_ERROR', payload: err.response.data.msg});
  }
};

export const logout = () => {
  return async (dispatch, getState) => {
    // console.log('get token', getState().login.data.token);
    console.log(await AsyncStorage.getItem('token'));
    dispatch({type: 'DELETE_TOKEN'});
  };
};
export const updateUser = data => async dispatch => {
  try {
    dispatch({type: 'AUTH_UPDATE_PENDING'});
    const result = await axios.put(base_url + `/auth/updateUser`, data, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    Toast.show(result.data.msg);
    setTimeout(() => {
      dispatch(showUser());
    }, 2000);
    dispatch({payload: result.data.msg, type: 'AUTH_UPDATE_SUCCESS'});
  } catch (err) {
    console.log('error');
    // dispatch({payload: err.response.data.msg, type: 'AUTH_UPDATE_FAILED'});
    console.log(err);
  }
};
export const showUser = data => async dispatch => {
  try {
    dispatch({type: 'AUTH_GETUSER_PENDING'});
    const result = await instance.get(base_url + `/auth/showUser`, data);
    dispatch({payload: result.data.user, type: 'AUTH_GETUSER_SUCCESS'});
  } catch (err) {
    console.log('error');
    // dispatch({payload: err.response.data.msg, type: 'AUTH_GETUSER_FAILED'});
    console.log(err);
  }
};
