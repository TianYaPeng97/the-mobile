import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '../store/index'

// 创建一个axios实例,设置不同的baseURL
const instance = axios.create({
    timeout:2000,
    baseURL:'http://ttapi.research.itcast.cn'
}) 

// 获取服务器返回的数据，并且是在处理数据之前使用
// transformResponse 是在响应拦截器之前执行
instance.defaults.transformResponse = [function (data){
try{
    //data数据可能不是标准的JSON格式字符串，否则会导致JSONbig.parse(data)
    return JSONbig.parse(data)
}catch(err){
    //无法转换的数据直接原样返回
    return data
    }
}]
// 请求拦截器
instance.interceptors.request.use(function (config) {
    //eslint-disable-next-line
    // console.log(config)
    //判断是否有登录状态
    if(store.state.user){
        // 如果有自动携带token
        config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config
},function (error) {
    return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function(response){
    return response.data.data || response.data
},function(error){
    return Promise.reject(error)
})

export default instance