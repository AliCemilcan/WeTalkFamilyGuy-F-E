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
                label="Re Type Password"
                label-for="input-password"
              >
                <b-form-input
                  id="input-password"
                  v-model="form.password_2"
                  type="password"
                  placeholder="Enter Password"
                  required
                  @keyup="checkPasswordMatch($event)"
                />
              </b-form-group>
              <b-form-group
                id="input-group-1"
                label="New Password"
                label-for="input-password"
                description=" Your password must be 8-20 characters long, contain letters and numbers, and must not
          contain spaces, special characters, or emoji."
              >
                <b-form-input
                  id="input-password"
                  v-model="form.password_new"
                  type="password"
                  placeholder="Enter New Password"
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
                :class="[input_disabled_submit]"

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
        password_1: '',
        password_2: '',
        timer: undefined
      },
      tabIndex: 0,
      user_view_text: 'Login',
      forgot_password: false,
      show_password_change: false,
      passwods_no_match: false,
      saved_posts:[]
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
    logOut() {
      this.$store.dispatch('logOut').then(() => {
        this.$router.push({ name: 'login' });
      });

    },
    passwordSection(){
      this.show_password_change = !this.show_password_change
    }
  }
}
</script>

<style src="../Login/login.css">

</style>
