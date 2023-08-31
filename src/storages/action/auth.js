import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const base_url = 'https://determined-pink-foal.cyclic.app/';

export const postLogin = data => async (dispatch, getState) => {
  try {
    dispatch({type: 'LOGIN_REQUEST'});
    const result = await axios.post(base_url + `auth/login`, data);
    console.log('result data ', result.data);
    await AsyncStorage.setItem('token', result.data.token);
    result.data && dispatch({type: 'LOGIN_SUCCESS', payload: result.data});
    result.data && console.log('success');
  } catch (err) {
    console.log('err');
    console.log(err.response.data.message);
    dispatch({type: 'LOGIN_ERROR', payload: err.response.data.msg});
  }
};
export const postRegister = data => async (dispatch, getState) => {
  try {
    dispatch({type: 'REGISTER_REQUEST'});
    const result = await axios.post(base_url + `auth/register`, data);
    console.log('result data ', result.data);
    result.data &&
      dispatch({type: 'REGISTER_SUCCESS', payload: result.data.msg});
    result.data && console.log('success');
  } catch (err) {
    console.log('err');
    console.log(err.response.data.message);
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
