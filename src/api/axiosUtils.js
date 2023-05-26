import axios from 'axios';
import router from '../router'

// 登录请求方法
const loginreq = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: params,
        traditional: true,
        transformRequest: [
            function(data) {
                let ret = ''
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ]
    }).then(res => res.data);
};
// 通用公用方法
const req = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            token: localStorage.getItem('logintoken')
        },
        data: params,
        traditional: true
    }).then(res => res.data);
};


// 通用公用方法
const reqGet = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            token: localStorage.getItem('logintoken')
        },
        data: params,
        traditional: true,
        transformRequest: [
            function(data) {
                let ret = ''
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ]
    }).then(res => res.data);
};


  //response响应拦截器
  axios.interceptors.response.use(
    response => {
        // 返回code === 1 || 返回code === 2
        if(response.data.code === 403){
            router.push('/login')
        } 
        return response
    },
    error => {
        if(error){
            const {response} = error
            if(response.status == 403){
                router.push('/login')
            }
        }
      return Promise.reject(error)
    }
);


export {
    loginreq,
    reqGet,
    req
}