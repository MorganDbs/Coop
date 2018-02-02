<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <div class="row">
        <div class="col-md-4 offset-4">
          <h2 class="title">Sign up</h2>
          <br>
          <form  v-on:submit.prevent="signup({fullname, email, password})">
            <div class="form-group">
              <input type="text" class="form-control"v-model="fullname" id="fullname"  placeholder="Full name" required>
            </div>
            <div class="form-group">
              <input type="email" class="form-control" v-model="email" id="email"  placeholder="Email" required>
            </div>
            <div class="form-group">
              <input type="password" class="form-control" v-model="password" id="password" placeholder="Password" required>
            </div>
            <br>
            <button type="submit" class="btn btn-block btn-primary">Sign up</button>
          </form>

          <div class="signup">
            Already got an account?
            <router-link to="signin" class="btn btn-link">Sign in</router-link>
          </div>
        </div>
      </div>
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
        fullname: '',
        email: '',
        password: '',
        error: null,
        trigger_error: false
      }
    },
    methods: {
      signup(info){
        this.$store.dispatch('account/signup', info)
        let error = this.$store.getters["account/getErrorSignup"]
        if(error != null){
          this.error = error
          this.trigger_error = true
        }
      }
    }
  }
</script>
