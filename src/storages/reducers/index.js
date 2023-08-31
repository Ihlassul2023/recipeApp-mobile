import {combineReducers} from 'redux';

import login from './login';
import register from './register';

const appReducers = combineReducers({
  login,
  register,
});

export default appReducers;
