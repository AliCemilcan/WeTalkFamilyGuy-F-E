<template>
  <div>
    <!-- <div v-if="login_register_view">
      <login-view @openForgotPassword="openForgotPassword" />
    </div>
    <!-- <div v-else>
      <forgot-password />
    </div> --> 
  </div>
</template>
<script>
//import loginView from '../views/Login/loginView.vue'
// import forgotPassword from './Login/forgotPassword.vue'
export default{
  components: {
    //loginView,
    // forgotPassword
  },
  data() {
    return{
      login_register_view: true
    }
  },
  methods:{
    openForgotPassword(){
      // this.$router.push({ name: 'forgot-password'})
      // this.login_register_view = false
    }
  }


}
</script>