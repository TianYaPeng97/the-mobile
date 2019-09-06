import axios from 'axios'
import JSONbig from 'json-bigint'

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
    // console.log(config)
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