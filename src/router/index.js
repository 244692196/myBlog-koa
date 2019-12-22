import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Add from '@/components/admin/Add'
import Details from '@/components/Details'
import Edit from '@/components/admin/Edit'
import Chat from '@/components/game/Chat'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/reg',
            name: 'Register',
            component: Register
        },
        {
            path: '/add',
            name: 'Add',
            component: Add
        },
        {
            path: '/article/:id',
            name: 'Details',
            component: Details
        },
        {
            path: '/edit/:id',
            name: 'Edit',
            component: Edit
        },
        {
            path:'/chat',
            name:'Chat',
            component:Chat
        }
    ]
})