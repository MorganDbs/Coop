import api from '@/api'
import ls from '@/services/ls'
import {router} from '@/router'

const initialState = {
    connected: false,
    user: {}
}

export default {
    namespaced: true,
    state: {
        connected: false,
        user: {},
        error_signin: null,
        error_signup: null
    },
    mutations: {
        signin: (state, data) => {
            state.connected = true
            state.user = data
            ls.set('token', data.token)
            router.push({
                name: 'home'
            })
        },
        initState(state) {
            ls.remove('token')
            Object.assign(state, initialState)
            router.push({
                name: 'signin'
            })
        },
        errorSignin(state, data){
            state.error_signin = data
        },
        errorSignup(state, data){
            state.error_signup = data
        }

    },
    getters: {
        isConnected: (state) => {
            return state.connected
        },
        getConnectedUser (state) {
            return state.user
        },
        getErrorSignin (state) {
            return state.error_signin
        },
        getErrorSignup (state) {
            return state.error_signup
        }
    },
    actions: {
        signin: ({ commit }, user) => {
            api.post('/members/signin', user).then((response) => {
                commit('signin', response.data)
            }).catch((error) =>{
                let e = error.response.data.error
                commit('errorSignin', e)
            })
        },
        signup: ({ commit }, user) => {
            api.post('/members', user).then((response) => {
                api.post('/members/signin', user).then((response) => {
                  commit('signin', response.data)
                })
            }).catch((error) =>{
                    let e = error.response.data.error[0][0]
                    commit('errorSignup', e)
                })
        },
        signout: ({ commit }, forceDeco) => {
            if(forceDeco){
                api.delete('/members/signout').then(response => {
                    commit("initState")
                }).catch(error => {
                    reject("store > auth > logout -> error")
                })
            }
        },
        deleteAccount: ({ commit }, id) => {
            api.delete('/members/'+id).then(response => {
                commit("initState")
            })
        }
    }
}
