import { login, register, getUserInfo, logout } from '@/api/user' 
import { setToken, removeToken } from '@/utils/util'

export default {
    state: {
        username: '',
        avatar: '',
        token: '',
        hasGetInfo: false
    },
    mutations: {
        setToken (state, token) {
            state.token = token
            setToken(token)
        },
        removeToken (state) {
            state.token = ''
            removeToken()
        },
        setUsername (state, name) {
            state.username = name
        },
        setAvatar (state, avatar) {
            state.avatar = avatar
        },
        setHasGetInfo (state, status) {
            state.hasGetInfo = status
        }
    },
    actions: {
        Login ({commit}, params) {
            return new Promise((resolve, reject) => {
                login({...params}).then(res => {
                    if (res.code === 2000) {
                        commit('setToken', res.data.token)
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        Register (params) {
            return new Promise((resolve, reject) => {
                register(params).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GetUserInfo ({commit}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    const username = res.data.user_name
                    const avatar = res.data.user_avatar
                    commit('setUsername', username)
                    commit('setAvatar', avatar)
                    commit('setHasGetInfo', true)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        Logout ({commit}) {
            return new Promise((resolve, reject) => {
                logout().then(res => {
                    commit('removeToken')
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}