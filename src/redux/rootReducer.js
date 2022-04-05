import { combineReducers } from 'redux';
import mainReducer from './mainRedux/mainReducer';
import authReducer from './authRedux/authReducer';

const rootReducer = combineReducers({
  user: authReducer,
  main: mainReducer,
});

export default rootReducer;
