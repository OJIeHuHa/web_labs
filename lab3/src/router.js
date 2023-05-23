import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('./pages/MainPage')
    },
    {
        path: '/login',
        component: () => import('./pages/LoginPage')
    },
    {
        path: '/register',
        component: () => import('./pages/RegisterPage')
    },
    {
        path: '/profile',
        component: () => import('./pages/ProfilePage')
    },
    {
        path: '/workpage',
        component: () => import('./pages/WorkPage')
    }
]
const router = new createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: "main-link"
})
export default router