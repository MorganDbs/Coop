<template>
    <div class="col-md-2 left">
        <h2>Channels</h2>
        <div v-if="this.channels.length > 0">
            <div id="channels">
                <div class="channel" v-for="channel in channels" :key="channel._id">
                    <router-link  v-b-tooltip.hover title="Jump to this channel !" :to="{ name: 'channel', params: { channel_id: channel._id }}">{{channel.label}}</router-link>
                </div>
            </div>

        </div>
        <div v-b-modal.modalPrevent class="newchannel">
                <icon v-b-tooltip.hover title="Create new channel" name="plus"></icon>
            </div>
        <br>


        <b-modal id="modalPrevent" ref="modal" title="Create new channel" @ok="handleOk" @shown="clearField">
            <form @submit.stop.prevent="createChannel">
                <b-form-input type="text" placeholder="Name of the channel.." v-model="label"></b-form-input>
                </br>
                <b-form-input type="text" placeholder="Topic of the channel.." v-model="topic"></b-form-input>
            </form>
        </b-modal>
    </div>

</template>

<script>
    import { mapActions } from 'vuex'
    import { mapGetters } from 'vuex'

    export default{
        data () {
            return {
                label: '',
                topic: '',
                error: null,
                trigger_error: false
            }
        },
        created(){
            this.$store.dispatch('channel/initiateChannels')
        },
        methods: {
            clearField () {
              this.label = ''
              this.topic = ''
            },
            handleOk (evt) {
              evt.preventDefault()
              if (!this.label) {
                alert('Please enter the name of the channel')
              } else if(!this.topic){
                alert('Please enter the topic of the channel')
              }else{
                this.createChannel()
              }
            },
            createChannel () {
                let channel = {'label': this.label, 'topic': this.topic}
                this.$store.dispatch('channel/createChannel', channel)
                this.clearField()
                this.$refs.modal.hide()
                let error = this.$store.getters["channel/getError"]
                if(error != null){
                  alert(error)
                }
            },
            deleteAccount (user) {
                this.$store.dispatch('account/deleteAccount', user._id)
            }
        },
        computed: {
            ...mapGetters({
                channels: 'channel/getChannels',
                user: 'account/getConnectedUser'
            })
        }
    }
</script>

<style>
    #modalPrevent .modal-title{
        color: #2c3e50;
    }
    .newchannel{
        margin-top: 10px;
        cursor: pointer;
    }
    .newchannel svg{
        height: 40px;
        width: auto;
    }
    .bottom{
        position: absolute;
        bottom: 0;
        left: 0;
        margin-left: 10%;
        margin-right: 10%;
        width: 80%;
        margin-bottom: 15px;
    }
    .left h2{
        margin-top: 10px;
    }
    .channel{
        font-size: 20px;
    }
</style>
