<template>
  <div class="jumbotron vertical-center bg">
    <div class="container">
      <div class="row">
        <div class="col-md-4 offset-4">
          <h2 class="title">Sign in</h2>
          <br>
          <form  v-on:submit.prevent="signin({email, password})">
            <div class="form-group">
              <input type="email" class="form-control" v-model="email" id="email"  placeholder="Enter email" required>
            </div>
            <div class="form-group">
              <input type="password" class="form-control" v-model="password" id="password" placeholder="Password" required>
            </div>
            <br>
            <button type="submit" class="btn btn-block btn-primary">Sign in</button>
          </form>

          <div class="signup">
            No account yet?
            <router-link :to="{ name: 'signup'}" class="btn btn-link" replace>Sign up</router-link>
          </div>
        </div>
      </div>
      <br><br>
      <div class="row">
          <div class="col-md-8 offset-2 ">
            <b-alert variant="danger" v-if="error != null" :show="trigger_error" @dismissed="trigger_error=false" dismissible>
              {{error}}
            </b-alert>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default{
    data () {
      return{
        email: '',
        password: '',
        error: null,
        trigger_error: false
      }
    },
    methods: {
      signin(info){
        this.$store.dispatch('account/signin', info)
        let error = this.$store.getters["account/getErrorSignin"]
        if(error != null){
          this.error = error
          this.trigger_error = true
        }
      }
    }
  }
</script>
<style>
  #app{
    margin: 0!important;
  }

  .title{
    color: white!important;
  }

  .jumbotron{
    margin-bottom: 0!important;
  }

  .vertical-center {
    min-height: 100%!important;
    min-height: 100vh!important;
    background: #0f0c29!important;

    display: flex!important;
    align-items: center!important;
  }

  .signup{
    color: white!important;
  }
</style>
