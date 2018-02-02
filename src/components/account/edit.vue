<template>
        <div class="middle">
          <div class="col-md-4 offset-4">
            <h2>
              My informations
            </h2>
            <br>
            <h4>
              Fullname: {{user.fullname}}
            </h4>
            <h4>
              Email: {{user.email}}
            </h4>
            <br>
            <button v-b-tooltip.hover title="This cannot be undo !" @click="deleteAccount(user)" type="button" class="btn btn-danger btn-block ">
             Delete my account
            </button>
          </div>
        </div>
</template>

<script>
  import { mapGetters } from 'vuex'


  export default{
    methods: {
        deleteAccount (user) {
                this.$store.dispatch('account/deleteAccount', user._id)
            }
    },
    computed: {
      ...mapGetters(
        {
          user: 'account/getConnectedUser'
        }
      )
    }
  }
</script>
<style>
  .middle{
    margin-top: 50px;
  }
</style>
