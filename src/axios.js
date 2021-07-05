import axios from 'axios'
import Element from 'element-ui';
import router from "./router";
import store from "./store";
// const requests = axios.create({
//   baseURL: process.env.VUE_APP_API, // 基础url,如果是多环境配置这样写，也可以像下面一行的写死。
// 　　// baseURL: 'http://168.192.0.123',
//   timeout: 6000 // 请求超时时间
// })

axios.defaults.baseURL="http://localhost:8081/"


// 请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
axios.interceptors.request.use(config=>{
    config.headers.token=window.sessionStorage.getItem('token')
    return config
})

axios.interceptors.response.use(response=>{
    let res=response.data.status
    if(response.config.url==="/message/exists"){
        return response
    }
    if(response.data.code==="401"||response.data.code===401)
    {
        router.push("/login")
        store.commit("REMOVE_INFO")
        Element.Message.error('登录失效', {duration: 3 * 1000})
        return false
    }
    if(res===401||res==="401"){
        router.push("/login")
        store.commit("REMOVE_INFO")
        Element.Message.error('登录失效', {duration: 3 * 1000})
        return false
    }
    if(res)
    if(res==200||res===400)
        return response
    else
        Element.Message.error(response.data.message,{duration: 3 * 1000})
},error => {


})