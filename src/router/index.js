import Vue from 'vue'
import Router from 'vue-router'
import tabbar from '@/views/tabbar'
import home from '@/views/home'

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/login',
            name:'login',
            component:() => import(/*webpackChunkName:"login" */ '../views/Login')
        },
        {
            path:'/',
            component:tabbar,
            children:[
                {
                    path:'',
                    name:'home',
                    component:home
                }
            ]
        }
    ]
})