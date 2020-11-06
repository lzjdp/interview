import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'
import { getToken, setToken } from '@/utils/util'

var router = new Router({
    routes,
    mode: 'history'
});

Vue.use(Router);

router.beforeEach((to, from, next) => {
    const token = getToken()
    if (to.name) {
        store.commit('setActiveNav', to.name)
    }
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (token && !store.state.user.hasGetInfo) {
        store.dispatch('GetUserInfo').then(() => {
            next()
        }).catch(() => {
            setToken('')
        })
    } else {
        next()
    }
})

router.afterEach(() => {
    window.scroll(0, 0)
})

export default router