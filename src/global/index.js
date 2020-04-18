import localStorage from './storage';
import {httpGet, httpPost} from '../utils/httpUtil';
import {gettypelist} from '../utils/mixins';
global.localStorage = localStorage;
global.httpGet = httpGet;
global.httpPost = httpPost;
global.gettypelist = gettypelist;
