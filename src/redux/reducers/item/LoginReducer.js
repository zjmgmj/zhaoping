import * as LoginTypes from '../ActionType';

const initialState = {
  status: '离线', //表示当前的登录状态，在线离线两种状态==用0和1当然更好了
  responsedUserMessage: null, //登录后的用户信息
};
export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case LoginTypes.LOGIN_IN:
      return {
        ...state,
        status: '在线',
        responsedUserMessage: action.responsedUserMessage,
      };
    case LoginTypes.LOGIN_IN_ERROR:
      return {
        ...state,
        status: '离线',
        responsedUserMessage: null,
      };
    case LoginTypes.LOGIN_OUT:
      return {
        ...state,
        status: '离线',
        responsedUserMessage: null,
      };
    default:
      console.log(state);
      return state;
  }
}
