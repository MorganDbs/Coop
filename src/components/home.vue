<template>
    <div>
            <navbar></navbar>

        <div class="row">
            <channels></channels>

            <div v-if="this.channels.length > 0 || ['edit'].indexOf($route.name) > -1"  class="col-md-8 center">
                <router-view/>
            </div>
            <div v-else class="col-md-8 center">
                <div class="col-md-6 offset-3 new_channel">
                    <h4>
                        Sadly there is no channel yet..
                        But let's start by creating one. ;-)
                    </h4>
                    <br>

                    <form  v-on:submit.prevent="createChannel({label, topic})">
                    <div class="form-group">
                      <input type="label" class="form-control" v-model="label" id="label"  placeholder="Enter label">
                    </div>
                    <div class="form-group">
                      <input type="topic" class="form-control" v-model="topic" id="topic" placeholder="Enter topic">
                    </div>
                    <br>
                    <button type="submit" class="btn btn-block btn-primary">Create my first channel</button>
                  </form>
                </div>
            </div>

            <members></members>
        </div>
    </div>
</template>

<script>
    import navbar from '@/components/ui/navbar'
    import members from '@/components/ui/members'
    import channel from '@/components/channel/channel'
    import channels from '@/components/channel/channels'
    import { mapActions } from 'vuex'
    import { mapGetters } from 'vuex'

    export default{
        components: {
            navbar: navbar,
            channel: channel,
            channels: channels,
            members: members
        },
        data(){
            return{
                label: '',
                topic:'',
                first_chan: ''
            }
        },
        created(){
            this.$store.dispatch('channel/initiateMembers')
            this.$store.dispatch('channel/initiateChannels')
        },
        methods: {
            ...mapActions('account', ['signout']),
            createChannel () {
                let channel = {'label': this.label, 'topic': this.topic}
                this.$store.dispatch('channel/createChannel', channel)
            },
        },
        computed: {
            ...mapGetters({
                members: 'channel/getMembers',
                channels: 'channel/getChannels'
            })
        }
    }
</script>

<style>
    #app{
        margin-top: 0!important;
    }
    *{
        border-radius: 0!important;
      }
    .row{
        color: #f6f6f7!important;
        margin: 0!important;
    }
    .left, .right{
        height: 95vh!important;
        max-height: 95vh!important;
        background: #2f3136;
    }
    .center{
        height: 95vh!important;
        max-height: 95vh!important;
        background: #36393e!important;
    }
    .new_channel{
        margin-top: 15vh!important;
    }
</style>
