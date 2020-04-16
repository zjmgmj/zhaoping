import localStorage from './storage';
import {httpGet, httPost} from '../utils/httpUtil';
global.localStorage = localStorage;
global.httpGet = httpGet;
global.httPost = httPost;
