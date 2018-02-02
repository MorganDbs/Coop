<template>
    <div class="navbar">
        <div class="col-md-2 nav_gauche ">
            <div class="mr-auto mx-auto">
                {{user.fullname | capitalize}}
            </div>
                <div v-b-tooltip.hover title="Edit account" class="edit">
                    <router-link  :to="{ name: 'edit'}"><icon name="cog"></icon></router-link>
                </div>
                <div v-b-tooltip.hover title="Signout" @click="signout" class="signout">
                    <icon name="sign-out"></icon>
                </div>
        </div>
        <div v-if="matched" class="col-md-10 nav_droite collapse navbar-collapse ">
            <div  class="channel_info navbar-nav mr-auto">
               <small>Edit my account</small>
            </div>
        </div>
        <div v-else-if="channels.length > 0" class="col-md-10 nav_droite collapse navbar-collapse ">
            <div  class="channel_info navbar-nav mr-auto">
                #{{ current_channel.label }} : {{ current_channel.topic}}
            </div>
            <div v-if="current_channel.member_id === user._id || current_channel.member_id == null" class="nav_right">
                <div>
                    <icon v-b-tooltip.hover title="Edit channel" v-b-modal.modalPreventPut name="pencil-square-o"></icon>
                </div>
                <div @click="deleteChannel" >
                    <icon v-b-tooltip.hover title="Delete channel" name="trash-o"></icon>
                </div>

            </div>

                    <b-modal id="modalPreventPut" @ok="handleOk" ref="modal_put" title="Edit channel">
                        <form @submit.stop.prevent="editChannel">
                            <b-form-input type="text" placeholder="Name of the channel.."  v-model="current_channel.label"></b-form-input>
                            </br>
                            <b-form-input type="text" placeholder="Topic of the channel.."  v-model="current_channel.topic"></b-form-input>
                        </form>
                    </b-modal>
        </div>

        <div v-else class="col-md-10 nav_droite collapse navbar-collapse ">
            <div  class="channel_info navbar-nav mr-auto">
               <small>No channel yet</small>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapState} from 'vuex'
    import store from '@/store'

  export default{
    data () {
        return {
            label: '',
            topic: '',
            error: null
        }
    },
    filters: {
      capitalize: function (value) {
        return value.toUpperCase()
      }
    },
    computed: {
        matched: function() {
            return this.$route.path.indexOf('/edit') == 0;
        },
      ...mapGetters(
        {
          user: 'account/getConnectedUser',
          channels: 'channel/getChannels'
        }
      ),
      ...mapState("channel", ['current_channel'])
    },
    methods: {
        ...mapActions('account', ['signout']),
        test(user){
            console.log(user)
        },
        handleOk (evt) {
            evt.preventDefault()
            this.editChannel()
        },
        editChannel () {
            let channel = {'label': this.current_channel.label, 'topic': this.current_channel.topic}
            this.$store.dispatch('channel/editChannel', channel)
            this.$refs.modal_put.hide()
        },
        deleteChannel(){
            this.$store.dispatch('channel/deleteChannel')
        }
    }
  }
</script>

<style>
    .navbar{
        height: 5vh!important;
        padding: 0!important;
        box-shadow: 0 1px 0 rgba(0,0,0,.2), 0 2px 0 rgba(0,0,0,.06)!important;
        z-index:2!important;
        min-height: 5vh!important;
    }
    .nav_gauche{
        background: #2f3136!important;
        height: 100%!important;
        display: flex!important;
        align-items: center!important;
        color: white!important;
    }
    .signout, .edit{
        cursor: pointer!important;
        float: right!important;
        margin-top: 4px!important;
        margin-left: 14px!important;
    }
    .signout svg{
        height: 20px!important;
        width: auto!important;
    }

    .edit svg{
        height: 18px!important;
        width: auto!important;
        color: white!important;
    }

    .nav_droite{
        background: #36393e!important;
        height: 100%!important;
        display: flex!important;
        align-items: center!important;
    }
    .channel_info{
        text-align: left!important;
        color: white!important;
        font-size: 25px!important;
    }
    .nav_right div{
        display: inline-block!important;
        color: white!important;
        margin-left: 10px!important;
    }
    .nav_right div svg{
        cursor: pointer!important;
        height: 20px!important;
        width: auto!important;
        margin-top: 10px!important;
    }


</style>
