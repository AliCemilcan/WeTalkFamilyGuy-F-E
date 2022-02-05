<template>
  <div>
    <b-form
      class="small_form"
      @submit.prevent="onSubmit"
    >
      <b-form-group
        id="input-group-1"
        label="Password"
        label-for="input-password"
        description=" Your password must be 8-20 characters long, contain letters and numbers, and must not
          contain spaces, special characters, or emoji."
      >
        <b-form-input
          id="input-password"
          v-model="form.password_1"
          type="password"
          placeholder="Password"
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
          placeholder="Re-Type Password"
          required
          @keyup="checkPasswordMatch($event)"
        />
        <b-form-invalid-feedback :state="!passwods_no_match">
          Passwords doesnot match
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button
        size="sm"
        type="submit"
        variant="primary"
      >
        Reset
      </b-button>
    </b-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  props:{
    tokenAvailable:{
      required: false,
      default: null,
      type: String
    }
  },
  data() {
    return {
      form: {
        password_1: '',
        password_2: '',
        timer: undefined
      },
      passwods_no_match: false,
    };
  },
  computed: {
    ...mapGetters(['getErrors',]),
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
    onSubmit(){
      var params = {
        token: this.tokenAvailable,
        password: this.form.password_2
      };
      
      this.$store.dispatch('resetPassword', params).then((res) => {
        console.log(res)
        this.$router.push({ name: 'login'})
      });
    }

  }
};
</script>

<style src="./login.css">

</style>