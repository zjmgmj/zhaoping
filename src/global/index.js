import localStorage from './storage';
import {
  httpGet,
  httpPost,
  // uploadFile,
  uploadImage,
  httpGetPromise,
} from '../utils/httpUtil';
import {
  gettypelist,
  date2Str,
  datetime2Str,
  date2Time,
  modal,
  dateMonth,
  date2Month,
  getAge,
  gettypelistName,
  uploadFile,
  getSexStr,
} from '../utils/mixins';
global.localStorage = localStorage;
global.httpGet = httpGet;
global.httpPost = httpPost;
global.uploadFile = uploadFile;
global.uploadImage = uploadImage;
global.gettypelist = gettypelist;
global.httpGetPromise = httpGetPromise;
global.date2Str = date2Str;
global.datetime2Str = datetime2Str;
global.date2Time = date2Time;
global.modal = modal;
global.dateMonth = dateMonth;
global.date2Month = date2Month;
global.getAge = getAge;
global.gettypelistName = gettypelistName;
global.getSexStr = getSexStr;
