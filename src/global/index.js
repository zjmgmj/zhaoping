import localStorage from './storage';
import {httpGet, httpPost, uploadFile} from '../utils/httpUtil';
import {gettypelist} from '../utils/mixins';
global.localStorage = localStorage;
global.httpGet = httpGet;
global.httpPost = httpPost;
global.uploadFile = uploadFile;
global.gettypelist = gettypelist;
