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
          v-if="register_view"
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          />
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Username:"
          label-for="input-4"
          description=""
        >
          <b-form-input
            id="input-4"
            v-model="form.username"
            type="text"
            placeholder="Enter Username"
            required
          />
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Password"
          label-for="input-password"
          description="      Your password must be 8-20 characters long, contain letters and numbers, and must not
          contain spaces, special characters, or emoji."
        >
          <b-form-input
            id="input-password"
            v-model="form.password_1"
            type="password"
            placeholder="Enter email"
            required
            @keyup="checkPasswordMatch($event)"
          />
          <b-form-invalid-feedback
            :state="password_1_rule_warning"
          >
            Please follow the password rules
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          v-if="register_view"
          id="input-group-1"
          label="Re Type Password"
          label-for="input-password"
          description="      Your password must be 8-20 characters long, contain letters and numbers, and must not
          contain spaces, special characters, or emoji."
        >
          <b-form-input
            id="input-password"
            v-model="form.password_2"
            type="password"
            placeholder="Enter email"
            required
            @keyup="checkPasswordMatch($event)"
          />
          <b-form-invalid-feedback :state="!passwods_no_match">
            Passwords doesnot match
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
            :disabled="passwods_no_match"
            :class="[input_disabled_submit]"
      
            size="lg"
            type="submit"
            variant="primary"
            class="float-left deneme"
          >
            Submit
          </b-button>
        </div>
        <div class="login-choice">
          <span>or Sign Up with</span>
        </div>
        <social-login />
        <change-view-button
          :text="'Sig In'"
          :router-text="'login'"
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
        username: '',
        name: '',
        password_1: '',
        password_2: '',
        food: null,
        checked: [],
        timer: undefined
      },
      passwods_no_match: false,
      register_view: true,
      user_view_text: 'Register',
      forgot_password: false
    };
  },
  computed: {
    ...mapGetters(['getErrors']),
    password_match() {
      return this.form.password_2 == this.form.password_1;
    },
    input_disabled_submit() {
      if (this.passwods_no_match) {
        return 'input-disabled';
      } else {
        return '';
      }
    },
    password_1_rule_warning() {
      if (this.form.password_1 == '') {
        return true;
      }
      let re = new RegExp(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*()-]).{8,}$'
      );
      let result = re.test(this.form.password_1);
      return result;
    }
  },
  methods: {
    checkPasswordMatch(event) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (this.form.password_2 != '' && event != '' && !this.password_match) {
          this.passwods_no_match = true;
        } else {
          this.passwods_no_match = false;
        }
      }, 700);
    },
    onSubmit() {
      if (this.password_match) {
        var params = {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password_1
        };
        this.$store.dispatch('UserSignUp', params).then(() => {
          this.$router.push({ name: 'main' });
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
