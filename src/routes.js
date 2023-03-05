import { createRouter, createWebHistory } from 'vue-router'
import Login from '/src/views/Login.vue'
import Home from '/src/views/Home.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '',
        name: 'home',
        component: Home,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, _from, next) => {
    const isAuthenticated = localStorage.getItem("token") ? true : false

    if (to.name !== 'login' && !isAuthenticated){
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router