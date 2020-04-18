import {httpGet} from './httpUtil';
export const gettypelist = (code, success, failure) => {
  httpGet(
    'dictionary/gettypelist',
    {code: code},
    res => {
      console.log(res);
      success(res);
    },
    err => {
      console.log(err);
      failure(err);
    },
  );
};
// /dictionary/gettypelist
