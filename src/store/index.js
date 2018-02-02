import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import router from "@/router"
import account from '@/store/modules/account'
import channel from '@/store/modules/channel'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        account,
        channel
    },
    state: { },
    mutations: { },
    getters: { },
    actions: { }
})
