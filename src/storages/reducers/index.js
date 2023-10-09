import {combineReducers} from 'redux';

import login from './login';
import register from './register';
import menuReducer from './menu/menu';
import menuHomeReducer from './menu/menu_home';
import post_menuReducer from './menu/post_menu';
import delete_menuReducer from './menu/delete_menu';
import detail_menuReducer from './menu/detail_menu';
import put_menuReducer from './menu/put_menu';
import myMenu_Reducer from './menu/myMenu_reducer';
import updateUser from './update_user';
import getUser from './get_user';

import postLikeReducer from './likeSave/postLikeReducer';
import getLikeReducer from './likeSave/getLikeReducer';
import postSaveReducer from './likeSave/postSaveReducer';
import getSaveReducer from './likeSave/getSaveReducer';

const appReducers = combineReducers({
  login,
  register,
  menuReducer,
  menuHomeReducer,
  post_menuReducer,
  delete_menuReducer,
  detail_menuReducer,
  put_menuReducer,
  myMenu_Reducer,
  updateUser,
  getUser,
  postLikeReducer,
  getLikeReducer,
  postSaveReducer,
  getSaveReducer,
});

export default appReducers;
