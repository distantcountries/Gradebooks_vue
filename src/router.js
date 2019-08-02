import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login'
import Register from './components/Register'
import Gradebooks from './components/Gradebooks'
import AllProfessors from './components/AllProfessors'
import MyGradebook from './components/MyGradebook'
import AddGradebook from './components/AddGradebook'
import AddProfessor from './components/AddProfessor'
import SingleGradebook from './components/SingleGradebook'
import SingleProfessor from './components/SingleProfessor'
import AddStudent from './components/AddStudent'

import { authService } from './services/Auth'

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
        path: '/teachers/:id',
        component: SingleProfessor,
        name: 'single-professor',
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
    {
        path: '/gradebooks/:id',
        component: SingleGradebook,
        name: 'single-gradebook',
    },
    {
        path: '/gradebooks/:id/students/create',
        component: AddStudent,
        name: 'add-student',
    },
]

export const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && to.name !== 'register' && to.name !== 'gradebooks' && !authService.isAuthenticated()) {
        return router.push({ name: 'login' });
    }

    if ((to.name === 'login' || to.name === 'register') && authService.isAuthenticated()) {
        return router.push({ name: from.name });
    }

    next()
})