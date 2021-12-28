<template>
  <div>
    <div>
      <b-form
        inline
        @submit.prevent="onSubmit"
      >
        <b-form-input
          v-if="!token_available"
          v-model="email"
          placeholder="Enter your email" 
          class="small_form"
          required
        />
        <div v-if="token_available">
          <password-view />
        </div>
        <b-button
          size="lg"
          type="submit"
          variant="primary"
        >
          Reset
        </b-button>
      </b-form>
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
