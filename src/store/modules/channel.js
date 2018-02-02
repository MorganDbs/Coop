import api from '@/api'
import {router} from '@/router'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        channels: null,
        current_channel: null,
        members: null
    },
    mutations: {
        createChannel: (state, data) => {
            state.channels.push(data)
            state.current_channel = data
                router.push({
                    name: 'channel',
                    params: {
                        channel_id: data._id
                    }
                })

        },
        editChannel: (state, data) => {
            for(let i in state.channels){
                if(state.channels[i]._id == state.current_channel._id){
                    state.channels[i].label = state.current_channel.label
                    state.channels[i].topic = state.current_channel.topic
                }
            }
        },
        initiateMembers: (state, data) => {
            state.members = data
        },
        initiateChannels: (state, data) => {
            state.channels = data
            if(state.channels.length > 0){
                router.push({
                    name: 'channel',
                    params: {
                        channel_id: data[0]._id
                    }
                })
                state.current_channel = data[0]
            }
        },
        channel: (state, data) => {
            state.current_channel = data
        },
        deleteChannel: (state) => {
            state.channels.splice(state.channels.indexOf(state.current_channel), 1)
            if(state.channels.length == 0){
                router.push({
                    name: 'home'
                })
            }else{
                router.push({
                    name: 'channel',
                    params: {
                        channel_id: state.channels[state.channels.length - 1]._id
                    }
                })
                state.current_channel = state.channels[state.channels.length - 1]
            }
        },
        messageMember: (state, id_member) => {
            state.members.forEach((member) => {
                if (member._id === id_member) {
                    return member.fullname
                }
            })
        },
        addMessage: (state, message) => {
            if(state.current_channel.posts == undefined){
                Vue.set(state.current_channel, "posts", [])
            }
            state.current_channel.posts.push(message)
        },
        deleteMessage: (state, message) => {
            state.current_channel.posts.splice(state.current_channel.posts.indexOf(message), 1)
        },
        editMessage: (state, data) => {
            let i = state.current_channel.posts.indexOf(data.message)
            state.current_channel.posts.splice(i, 1, data.editMessage)
        },
        errorChannel: (state, data) =>{
            state.error = data
        }
    },
    getters: {
        getChannels: (state) => {
            return state.channels
        },
        getCurrentChannel: (state) => {
            return state.current_channel
        },
        getMembers: (state) => {
            return state.members
        }
    },
    actions: {
        createChannel: ({ commit }, info) => {
            api.post('/channels', info).then((response) => {
              commit('createChannel', response.data)
            }).catch((error) =>{
                    let e = error.response.data.error
                    alert(e)
                })
        },
        editChannel: ({ commit, state }, info) => {
            api.put('/channels/' + state.current_channel._id , info).then((response) => {
                commit('editChannel', response.data)
            }).catch((error) =>{
                let e = error.response.data.error
                alert(e)
            })
        },
        deleteChannel: ({commit, state}) =>{
            api.delete('/channels/' + state.current_channel._id).then((response) => {
                commit('deleteChannel')
            })
        },
        initiateMembers: ({ commit }) => {
            api.get('/members').then((response) => {
                commit('initiateMembers', response.data)
            })
        },
        initiateChannels: ({ commit }) => {
            api.get('/channels').then((response) => {
                commit('initiateChannels', response.data)
            })
        },
        channel({ commit }, id) {
            api.get('/channels/' + id).then((response) => {
                commit('channel', response.data)
            })
        },
        addMessage: ({ commit, state }, message) => {
            api.post('/channels/' + state.current_channel._id + '/posts', message).then((response) => {
                commit('addMessage', response.data)
            })
        },
        deleteMessage: ({ commit }, message) => {
            api.delete('/channels/' + message.channel_id + '/posts/' + message._id).then((response) => {
                commit('deleteMessage', message)
            })
        },
        messageMember:  ({ commit },id_member) => {
            commit('messageMember', id_member)
        },
        editMessage: ({ commit }, messages) => {
            api.put('/channels/' + messages.message.channel_id + '/posts/' + messages.message._id, { message: messages.editMessage }).then((response) => {
                commit("editMessage", {message : messages.message, editMessage: response.data })
            })
        }
    }
}
