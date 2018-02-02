<template>
        <div>
          <div class="chat" id="chat" v-chat-scroll>
            <div class="message" v-for="p in channel.posts" :key="p._id">
              <div v-if="messageMember(p.member_id)" class="member">
                {{ messageMember(p.member_id).fullname }} <small class="date"> {{p.updated_at | formatDate}} </small>
                <div v-if="p.member_id === user._id" class="edit pull-right" @click="deleteMessage(p)"><icon class="delete" v-b-tooltip.hover title="Delete message" name="times"></icon></div>
                <div v-if="p.member_id === user._id" class="edit pull-right" @click="editingForm(p._id)"><icon v-b-tooltip.hover title="Edit message" name="pencil"></icon></div>
              </div>
              <div class="delete_acc" v-else><i>Deleted account</i></div>

              <form class="editmessage" v-on:submit.prevent="editMessage(p)" v-if="editing === p._id">
                <div class="input-group">
                  <input type="text" class="form-control" :value="p.message"required>
                  <div class="input-group-btn">
                    <button class="btn btn-default" type="submit">
                      Edit
                    </button>
                  </div>
                </div>
              </form>
              <vue-markdown v-else>{{p.message}}</vue-markdown>
            </div>
          </div>
            <form class="sendmessage" v-on:submit.prevent="addMessage({message})">
              <div class="input-group">
                <input type="text" v-model="message" class="form-control" placeholder="Your message..">
                <div class="input-group-btn">
                  <button class="btn btn-default" type="submit">
                    Send
                  </button>
                </div>
              </div>
            </form>
        </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { router } from '@/router'
  import store from '@/store'
  import moment from 'moment'
  import VueMarkdown from 'vue-markdown'

  export default{
    components: {
      VueMarkdown
    },
    data(){
      return{
        message: '',
        editing: null
      }
    },
    filters:{
      formatDate: (value) => {
        moment.locale();
        if (value) {
          return moment(String(value)).format('LLL')
        }
      }
    },
    beforeRouteUpdate: (to, from, next) => {
      store.dispatch('channel/channel', to.params.channel_id)
      next()
    },
    created: () => {
      store.dispatch('channel/channel', router.history.current.params.channel_id)
    },
    methods: {
      editingForm(id){
        if(this.editing == null){
          this.editing = id
        }else{
          this.editing = null
        }
      },
      addMessage (message) {
        if(message.message.length > 0){
          this.$store.dispatch('channel/addMessage', message)
          this.message = ''
        }
      },
      editMessage (message) {
        let editMessage = this.$el.querySelector('input').value
        this.$store.dispatch('channel/editMessage', { message, editMessage })
        this.editing = null
        alert("Edit success, reflresh the channel to see the editing")
      },
      messageMember (id_member) {
        let members = this.$store.getters['channel/getMembers']
        let member = null
        members.forEach((m) =>{
          if(m._id === id_member){
            member = m
          }
        })
        return member
      },
      deleteMessage (message) {
          this.$store.dispatch('channel/deleteMessage', message)
      },
    },
    computed: {
      ...mapGetters(
        {
          channel: 'channel/getCurrentChannel',
          user: 'account/getConnectedUser'
        }
      )
    }
  }
</script>
<style>
  .chat{
    overflow-y: scroll;
    height: 80vh;
    margin-top: 10px;
    word-break: break-all;
  }
  .sendmessage{
    height: 5vh;
    border-top: 1px solid hsla(0,0%,100%,.08);
    margin-left: 15px;
    margin-right: 15px;
  }
  .sendmessage .input-group{
    margin-top: 2%;
  }
  .message{
    margin-top: 8px;
    margin-bottom: 10px;
    border-top: 1px solid hsla(0,0%,100%,.08);
    text-align: left;
    margin-left: 15px;
    margin-right: 15px;
    font-size: 18px;
  }

  .member{
    color: #3498db;
    font-size: 25px;
  }

  .date{
    color: hsla(0,0%,100%,.2);
    font-size: 13px;
  }

  .chat::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #2f3136;
  }

  .chat::-webkit-scrollbar
  {
    width: 8px;
    background-color: #36393e;
  }

  .chat::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 8px rgba(0,0,0,0.5);
    background-color: #1c1e21;
  }
  .delete{
    color: red!important;
  }

  .delete_acc{
    color: #dc3545;
  }
</style>
