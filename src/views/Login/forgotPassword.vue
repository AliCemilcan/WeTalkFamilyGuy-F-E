<template>
  <div class="mt-3">
    <div>
      <b-form
        v-if="!token_available"
        inline
        class="display_flex"
        @submit.prevent="onSubmit"
      >
        <b-form-input
          v-if="!token_available"
          v-model="email"
          placeholder="Enter your email" 
          class="small_form"
          required
        />
       
        <b-button
          size="sm"
          type="submit"
          variant="primary"
        >
          Send
        </b-button>
      </b-form>
      <div v-else>
        <password-view :token-available="token_available" />
      </div>
    </div>
  </div>
</template>
<script>
import passwordView from './passwordView.vue'
export default ({
  components: {
    passwordView
  },
  data() {
    return{
      email:'',
    }
  },
  computed:{
    token_available(){
      return this.$route.query.token
    }
  },
  methods:{
	  onSubmit(){
      var params = {
        email: this.email
      }
      this.$store.dispatch('forgotPassword', params).then((res) => {
        console.log(res)
        window.location.href = res.url
        // this.$router.push({ name: 'login' });
      }).catch


	  }
  }
})
</script>
<style src="./login.css">

</style>
