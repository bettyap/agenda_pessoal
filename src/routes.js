import { createRouter, createWebHistory } from 'vue-router'
import Login from '/src/views/Login.vue'
import Home from '/src/views/Home.vue'
import MeuCadastro from '/src/views/MeuCadastro.vue'

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
    {
        path: '/meu-cadastro',
        name: 'meuCadastro',
        component: MeuCadastro,
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