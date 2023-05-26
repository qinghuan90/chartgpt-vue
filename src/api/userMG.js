import axios from 'axios';
import { loginreq, req, reqGet } from './axiosUtils';


// 登录接口 
export const login = (params) => { return loginreq("post", "/login", params) };
//获取用户信息
export const getUserInfo = () => { return req("get", "/userinfo", null)};
