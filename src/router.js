import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login'
import Register from './components/Register'
import Gradebooks from './components/Gradebooks'
import AllProfessors from './components/AllProfessors'
import MyGradebook from './components/MyGradebook'
import AddGradebook from './components/AddGradebook'
import AddProfessor from './components/AddProfessor'

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
    {
        path: '/teachers',
        component: AllProfessors,
        name: 'all-professors',
    },
    {
        path: '/my-gradebook',
        component: MyGradebook,
        name: 'my-gradebook',
    },
    {
        path: '/gradebooks/create',
        component: AddGradebook,
        name: 'add-gradebook',
    },
    {
        path: '/professors/create',
        component: AddProfessor,
        name: 'add-professors',
    },


]

export const router = new VueRouter({
    routes,
    mode: 'history'
})


