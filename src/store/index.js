import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import subject from './modules/subject'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        subject
    }
})

export default store