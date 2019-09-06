import Vue from 'vue'
import Vuex from 'vuex'
//把localStorage文件中的模块全部导入
import * as storageTools from '@/utils/localStorage.js' 

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        //项目运行时，先去本地存储中获取登录状态
        user:storageTools.getItem('user')
    },
    mutations:{
        // 通过mutation改变状态
        setUser (state,user){
            state.user = user
            // 把登录状态存储到本地
            storageTools.setItem('user',user)
        }
    },
    actions:{}
})