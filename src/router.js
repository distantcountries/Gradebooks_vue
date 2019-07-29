import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login'
import Register from './components/Register'
import Gradebooks from './components/Gradebooks'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Gradebooks,
        name: 'gradebooks',
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
    },
    {
        path: '/register',
        component: Register,
        name: 'register',
    },


]

export const router = new VueRouter({
    routes,
    mode: 'history'
})

