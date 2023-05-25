import axios from 'axios';
import {req } from './axiosUtils';



// 请求gpt
export const askGPT = (params) => { return req("post", "/gpt/ask", params) };

