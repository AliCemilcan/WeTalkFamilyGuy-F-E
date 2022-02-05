<template>
  <div>
    <div class="login-main">
      <b-tabs
        v-model="tabIndex"
        content-class="mt-3"
        fill
      >
        <b-tab
          title="Account"
          active
        >
          <template #title>
            <b-icon icon="person-fill" /> Account
          </template>
          <b-form
            class="small_form mt-3"
            @submit.prevent="onSubmit"
            @reset="logOut"
          >
            <b-form-group
         
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <div class="display-flex-password">
                <b-form-input
                  id="input-1"
                  v-model="form.username"
                  class="margin-right-n-2"
                  type="email"
                  placeholder="Enter email"
                  required
                />
                <b-icon
                  icon="gear-fill"
                  aria-hidden="true"
                  class="hover"
                  @click="emailSection()"
                />
              </div>
            </b-form-group>
            <div v-if="show_email_change">
              <b-form-group
                id="input-group-1"
                label="New Email"
                label-for="input-new-email"
              >
                <b-form-input
                  id="input-new-email"
                  v-model="form.new_email"
                  type="email"
                  placeholder="Enter New Email"
                  required
                />
              </b-form-group>
              <b-form-invalid-feedback :state="!email_valid">
                Email is not valid
              </b-form-invalid-feedback>
            </div>
            <b-form-group
              id="input-group-1"
              label="Password"
              label-for="input-password"
            >
              <div class="display-flex-password">
                <b-form-input
                  id="input-password"
                  v-model="form.password_1"
                  type="password"
                  class="margin-right-n-2"
                  placeholder="Enter Password"
                  required
                />
                <b-icon
                  icon="gear-fill"
                  aria-hidden="true"
                  class="hover"
                  @click="passwordSection()"
                />
              </div>
            </b-form-group>
            <div v-if="show_password_change">
              <b-form-group
                id="input-group-1"
                label="New Password"
                label-for="input-password"
              >
                <b-form-input
                  id="input-password"
                  v-model="form.password_2"
                  type="password"
                  placeholder="Enter Password"
                  required
                />
              </b-form-group>
              <b-form-group
                id="input-group-1"
                label="Re-Type New Password"
                label-for="input-password"
                description=" Your password must be 8-20 characters long, contain letters and numbers, and must not
          contain spaces, special characters, or emoji."
              >
                <b-form-input
                  id="input-password"
                  v-model="form.password_new"
                  type="password"
                  placeholder="Enter New Password"
                  @keyup="checkPasswordMatch($event)"
                />
              </b-form-group>
              <b-form-invalid-feedback :state="!passwods_no_match">
                Passwords doesnot match
              </b-form-invalid-feedback>
            </div>
            <div class="signup-buttons">
              <b-button
                size="lg"
                class="float-right deneme"
                type="reset"
                variant="danger"
              >
                Log Out
              </b-button>
              <b-button
                :disabled="input_disabled_submit"
                size="lg"
                type="submit"
                variant="primary"
                class="float-left deneme"
              >
                Update
              </b-button>
            </div>
            <div>
              <!-- <router-link :to="{ name: 'forgot-password' }">
            <a
              class="white mt-2"
              type="button"
            >
              <span>Forgot your password ?</span>
            </a>
          </router-link> -->
            </div>
          </b-form>
        </b-tab>
        <b-tab title="Second">
          <template #title>
            <b-icon icon="files" /> Saved Posts
          </template>
          <div
            v-for="post in saved_posts"
            :key="post._id"
            class="profile-saved-posts"
          >
            <user-comment
              :post="post"
              :show-extra-season="false"
            />
          </div>
        </b-tab>
        <b-tab title="Very, very long title">
          <template #title>
            <b-icon icon="inbox-fill" /> Messages
          </template>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import userComment from '../common/userComment.vue'
export default {
  components: {
    userComment
  },
  data() {
    return {
      form: {
        username:'',
        new_username:'',
        password_1: '',
        password_2: '',
        timer: undefined
      },
      tabIndex: 0,
      user_view_text: 'Login',
      forgot_password: false,
      show_password_change: false,
      show_email_change: false,
      email_valid: false,
      passwods_no_match: false,
      saved_posts:[]
    };
  },
  computed: {
    input_disabled_submit() {
      if (this.show_password_change || this.show_email_change) {
        return false;
      } else {
        return true;

      }
    },
    ...mapGetters(['currentUser','getErrors','getErrorStatus'])
  },
  watch:{
    tabIndex(val) {
      switch (val) {
      case 0:
        break;
      case 1:
        this.getSavedPosts()
        break;
      case 2:
        break;
      }
    }
  },
  methods: {
    getSavedPosts(){
      var params = {
        id: this.currentUser._id,
        posts: this.currentUser.savedPosts
      }
      console.log(params)
      this.$store.dispatch('getPostsByID', params).then((res) => {
        console.log(res)
        this.saved_posts = res.saved_posts
      });

    },  
    onSubmit() {
      //check if user update their email and password
      var params = {
        user_id: this.currentUser._id,
        username: this.form.username,
        password: this.form.password_1
      };
      if(this.show_password_change){
        this.checkPasswordMatch()
        if(!this.passwods_no_match){
          params.new_password = this.form.password_new
        }else{
          return
        }
      }
      if(this.show_email_change){
        this.validateEmail()
        if(this.validateEmail()){
          this.email_valid = false
          params.new_email = this.form.new_username
        }else{
          this.email_valid = true
          return
        }
      }
      this.$store.dispatch('updateCredentials', params).then((res) => {
        this.logOut();
        console.log(res)
      });


    },
    logOut() {
      this.$store.dispatch('logOut').then(() => {
        this.$router.push({ name: 'login' });
      });

    },
    validateEmail(email){
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
    checkPasswordMatch(){
      if(this.form.password_2 != this.form.password_new){
        this.passwods_no_match = true
      }else{
        this.passwods_no_match = false
      }
    },
    passwordSection(){
      this.show_password_change = !this.show_password_change
    },
    emailSection(){
      this.show_email_change = !this.show_email_change
    }

  }
}
</script>

<style src="../Login/login.css">

</style>
