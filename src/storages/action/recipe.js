import {Toast} from 'react-native-toast-notifications';
import {instance} from '../../utils/serviceApi';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const url = 'https://determined-pink-foal.cyclic.app';

export const getMenu =
  (search = '', select = 'title', page = 1, sort = 'ASC') =>
  async dispatch => {
    try {
      dispatch({type: 'GET_MENU_PENDING'});
      const result = await axios.get(
        `${url}/recipe?searchBy=${select}&search=${search}&page=${page}&sort=${sort}&limit=3`,
      );
      dispatch({payload: result.data, type: 'GET_MENU_SUCCESS'});
    } catch (err) {
      console.log('error');
      dispatch({payload: err.response.data.msg, type: 'GET_MENU_FAILED'});
      console.log(err);
    }
  };

export const getMenuDetail = id => async dispatch => {
  try {
    dispatch({type: 'DETAIL_MENU_PENDING'});
    const result = await axios.get(`${url}/recipe/${id}`);
    dispatch({payload: result.data.data, type: 'DETAIL_MENU_SUCCESS'});
  } catch (err) {
    console.log('error');
    dispatch({payload: err.response.data.msg, type: 'DETAIL_MENU_FAILED'});
    console.log(err);
  }
};

export const postMenu = data => async (dispatch, getState) => {
  try {
    dispatch({type: 'POST_MENU_PENDING'});
    const result = await axios.post(`${url}/recipe`, data, {
      headers: {
        Authorization: `Bearer ${getState().login.data.token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    Toast.show(result.data.msg);
    dispatch({payload: result.data.msg, type: 'POST_MENU_SUCCESS'});
  } catch (err) {
    console.log('error');
    Toast.show(err.response.data.msg);
    dispatch({payload: err.response.data.msg, type: 'POST_MENU_FAILED'});
    console.log(err);
  }
};

export const updateMenu = (data, id) => async (dispatch, getState) => {
  try {
    dispatch({type: 'PUT_MENU_PENDING'});
    const result = await axios.put(`${url}/recipe/${id}`, data, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    Toast.show(result.data.msg);
    dispatch({payload: result.data.msg, type: 'PUT_MENU_SUCCESS'});
  } catch (err) {
    console.log(err);
    console.log('error');
    // Toast.show(err.response.data.msg);
    // dispatch({payload: err.response.data.msg, type: 'PUT_MENU_FAILED'});
  }
};

export const deleteMenu = id => async dispatch => {
  try {
    dispatch({type: 'DELETE_MENU_PENDING'});
    const result = await instance.delete(`${url}/recipe/${id}`);
    Toast.show(result.data.msg);
    setTimeout(() => {
      dispatch(getMyMenu());
    }, 1000);
    dispatch({payload: result.data.msg, type: 'DELETE_MENU_SUCCESS'});
  } catch (err) {
    console.log('error');
    dispatch({payload: err.response.data.msg, type: 'DELETE_MENU_FAILED'});
    console.log(err);
  }
};
export const getMyMenu = () => async dispatch => {
  try {
    dispatch({type: 'GETMY_MENU_PENDING'});
    const result = await instance.get(`${url}/recipe/myRecipe`);
    dispatch({payload: result.data.data, type: 'GETMY_MENU_SUCCESS'});
  } catch (err) {
    console.log('error');
    dispatch({payload: err.response.data.msg, type: 'GETMY_MENU_FAILED'});
    console.log(err);
  }
};
