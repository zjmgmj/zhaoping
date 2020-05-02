import {combineReducers} from 'redux';
import LoginReducer from './LoginReducer';
import GetDictionaryReducer from './GetDictionaryReducer';

//这个表示把多个reducer连接起来，
const rootReducer = combineReducers({
  LoginReducer: LoginReducer,
  GetDictionaryReducer: GetDictionaryReducer,
});

export default rootReducer;
