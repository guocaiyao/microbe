import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 10*60*1000;
axios.defaults.baseURL ='';

//使用拦截器统一处理所有的http请求
//http request 拦截器 在发送请求之前做些什么
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/json'
    }
    if(sessionStorage.getItem('token')){
      config.headers.token = sessionStorage.getItem('token');
    }    
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器  对响应数据做点什么
axios.interceptors.response.use(
  response => {        
    if(response.data.errCode ==2){
      router.push({
        path:"/login",
        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封login请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function login(url,data = {}){
  return new Promise((resolve,reject) => { 
    axios.post(url,data,{headers:{'Content-Type':'application/json'}})
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params, { indices: false })
      }
    }).then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => { 
     axios.post(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

 /**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function deleteTo(url,params={}){
  return new Promise((resolve,reject) => { 
    axios.delete(url,{
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params, { indices: false })
      }
    }).then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}
