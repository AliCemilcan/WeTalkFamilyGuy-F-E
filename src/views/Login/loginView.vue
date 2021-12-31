<template>
  <div>
    <div class="login-main">
      <h2>{{ user_view_text }}</h2>
      <b-form
        class="small_form"
        @submit.prevent="onSubmit"
        @reset="onReset"
      >
        <b-form-group
         
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="form.username"
            type="email"
            placeholder="Enter email"
            required
          />
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Password"
          label-for="input-password"
        >
          <b-form-input
            id="input-password"
            v-model="form.password_1"
            type="password"
            placeholder="Enter Password"
            required
          />
          <b-form-invalid-feedback
            :state="getErrorStatus"
          >
            Password Wrong
          </b-form-invalid-feedback>
        </b-form-group>

        <div class="signup-buttons">
          <b-button
            size="lg"
            class="float-right deneme"
            type="reset"
            variant="danger"
          >
            Reset
          </b-button>
          <b-button
            :class="[input_disabled_submit]"

            size="lg"
            type="submit"
            variant="primary"
            class="float-left deneme"
          >
            Submit
          </b-button>
        </div>
        <div>
          <router-link :to="{ name: 'forgot-password' }">
            <a
              class="white mt-2"
              type="button"
            >
              <span>Forgot your password ?</span>
            </a>
          </router-link>
        </div>
        <div class="login-choice">
          <span>or Sign In with</span>
        </div>
        <social-login />
        <change-view-button
          :text="'SignUp'"
          :router-text="'register'"
        />
      </b-form>
    </div>
  </div>
</template>
<script>
import socialLogin from './socialLogin.vue'
import changeViewButton from './changeViewButton.vue'
import { mapGetters } from 'vuex';

export default {
  components:{ socialLogin, changeViewButton},
  data() {
    return {
      form: {
        username:'',
        password_1: '',
        timer: undefined
      },
      user_view_text: 'Login',
      forgot_password: false
    };
  },
  computed: {
    input_disabled_submit() {
      return ''
      // if (!this.password_1 || !this.username) {
      //   return 'input-disabled';
      // } else {
      //   return '';
      // }
    },
    ...mapGetters(['getErrors','getErrorStatus'])
  },
  methods: {
    onSubmit() {
      if (this.form.username && this.form.password_1) {
        var params = {
          username: this.form.username,
          password: this.form.password_1
        };
        this.$store.dispatch('UserLogin', params).then(() => {
          this.$router.push({ name: 'season', params: {id: 1} });
        });
      }
    },
    onReset() {

    }
  }
};
</script>

<style src="./login.css">

</style>
