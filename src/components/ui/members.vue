<template>
    <div class="col-md-2 right">
        <h2>Members</h2>
        <div id="members">
            <div class="member_list" v-for="member in members">
                {{member.fullname}}
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { mapGetters } from 'vuex'

    export default{
        created(){
            this.$store.dispatch('channel/initiateMembers')
        },
        computed: {
            ...mapGetters({
                members: 'channel/getMembers'
            })
        }
    }
</script>

<style>
    #members{
        margin-top: 10px;
    }
    .member_list{
        margin-top: 5px;
        text-align: left;
    }
</style>
