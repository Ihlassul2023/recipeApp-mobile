import {Toast} from 'react-native-toast-notifications';
import {instance} from '../../utils/serviceApi';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const url = 'https://determined-pink-foal.cyclic.app';

export const postLike = data => async (dispatch, getState) => {
  console.log(await AsyncStorage.getItem('token'));
  try {
    dispatch({type: 'POST_LIKE_PENDING'});
    console.log(data);
    const result = await instance.post(`${url}/likeSaved/like/${data}`);
    Toast.show(result.data.msg);
    dispatch(getLike());
    dispatch({payload: result.data.msg, type: 'POST_LIKE_SUCCESS'});
  } catch (err) {
    console.log('error');
    Toast.show(err.response.data.msg);
    dispatch({payload: err.response.data.msg, type: 'POST_LIKE_FAILED'});
    console.log(err);
  }
};
export const getLike = () => async (dispatch, getState) => {
  try {
    dispatch({type: 'GET_LIKE_PENDING'});
    const result = await instance.get(`${url}/likeSaved/like`);
    dispatch({payload: result.data.data, type: 'GET_LIKE_SUCCESS'});
  } catch (err) {
    console.log('error');
    Toast.show(err.response.data.msg);
    dispatch({payload: err.response.data.msg, type: 'GET_LIKE_FAILED'});
    console.log(err);
  }
};
export const postSave = data => async (dispatch, getState) => {
  try {
    dispatch({type: 'POST_SAVE_PENDING'});
    const result = await instance.post(`${url}/likeSaved/bookmark/${data}`);
    Toast.show(result.data.msg);
    dispatch(getSave());
    dispatch({payload: result.data.msg, type: 'POST_SAVE_SUCCESS'});
  } catch (err) {
    console.log('error');
    Toast.show(err.response.data.msg);
    dispatch({payload: err.response.data.msg, type: 'POST_SAVE_FAILED'});
    console.log(err);
  }
};
export const getSave = () => async (dispatch, getState) => {
  try {
    dispatch({type: 'GET_SAVE_PENDING'});
    const result = await instance.get(`${url}/likeSaved/bookmark`);
    dispatch({payload: result.data?.data, type: 'GET_SAVE_SUCCESS'});
  } catch (err) {
    console.log('error');
    Toast.show(err.response.data.msg);
    dispatch({payload: err.response.data.msg, type: 'GET_SAVE_FAILED'});
    console.log(err);
  }
};
