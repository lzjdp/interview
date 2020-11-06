export default {
    state: {
        activeNavItem: 'home',
        showLogin: false
    },
    mutations: {
        setActiveNav (state, name) {
            state.activeNavItem = name
        },
        setLogin (state, value) {
            state.showLogin = value
        }
    }
}