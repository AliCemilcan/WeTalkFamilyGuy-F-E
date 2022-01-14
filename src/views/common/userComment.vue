<template>
  <div class="mt-1 mb-2">
    <div class="hot-topic-border font-family-roboto">
      <a @click="showComments()">
        <div class="hot-topic-flex">
       
          <span class="user-episode"> <b>@</b>{{ post.userName }} </span>
          
          <span class="date-episode ml-auto mr-1"> {{ ISODateTimePrettier(post.created_at) }} </span>
          <span v-if="postOwner">
            <a @click="removePost()">
              <b-dropdown
                toggle-class="my-custom-toggle"
                variant="'none'"
                no-caret
                size="'sm'"
              >
                <template
                  #button-content
                  class="cleaner"
                >
                  <b-icon
                    class="small-button-shadow vertical-align-reset cleaner"
                    icon="three-dots-vertical"
                    aria-hidden="true" 
                    font-scale="0.5"
                  />
                </template>
                <b-dropdown-item-button>
                  <b-icon
                    class="small-button-shadow vertical-align-reset"
                    icon="trash"
                    aria-hidden="true" 
                  />
                 
                </b-dropdown-item-button>
              </b-dropdown>

            </a>

          </span>
          <span v-else>
            <a @click="savePost()">
              <b-icon
                :class="[userAlreadyUpvoted]"
                icon="bookmark-plus"
                aria-hidden="true"
                class="small-button-shadow vertical-align-reset"
              /> </a> 
                      
            <span
              v-if="showExtraSeason"
              class="season-episode-bubble"
            >
              <span
                class="bubble-inline-text"
              >{{ post.SeasonEpisode }}/span>
              </span>
            </span>
          </span></div>
        <div class="episode-title ml-1 mt-1">
          <span>
            {{ post.title }}
          </span>
        </div>
        <div>
          {{ post.content }}
        </div>
      </a>

      <comment-buttons
        :post="post"
        @openReplyArea="openReplyArea"
        @openCommentsAll="openCommentsAll"
      />
      
      <comment-reply
        v-if="open_reply"
        :post-id="post._id"
        @closeReplyModal="openReplyArea()"
      />
      <div v-if="post.comment && show_one_comment && !show_only_title">
        <single-comment :comments="post.comment[0]" />
      </div>
      <div
        v-for="(c, index) in post.comments"
        v-else-if="!show_only_title"
        :key="index"
      >
        <single-comment
          :nested-comment="true"
          :comments="c"
        />
      </div>
    </div>
  </div>
</template>
<script>
import singleComment from '../comments/singleComment.vue';
import commentReply from '../comments/commentReply.vue';
import commentButtons from '../comments/commentButtons.vue';
import commentMixin from '../../mixins/commentMixin';
import { mapGetters } from 'vuex';

export default {
  components: {
    singleComment,
    commentReply,
    commentButtons
  },
  mixins: [commentMixin],
  props: {
    showExtraSeason: {
      required: false,
      default: true,
      type: Boolean,
    },
    post:{
      required: true,
      type: Object
    }
  },
  data() {
    return {
      open_reply: false,
      show_one_comment: true,
      show_only_title: true,
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated']),
    userAlreadyUpvoted(){
      if(this.currentUser){
        if(this.post.savedBy.includes(this.currentUser._id)){
          return 'already-voted'
        }else{
          return ''
        }
      }else{
        return 'unauthorized'
      }
    },
    postOwner(){
      if(this.currentUser){
        console.log(this.currentUser)
        if(this.post.createdBy.includes(this.currentUser._id)){
          return true
        }else{
          return false
        }
      }else{
        return false
      }
    }
  },

  methods: {
    openReplyArea(){
      this.open_reply = !this.open_reply
    },
    savePost(){
      if(this.isAuthenticated){
        var params = {
          post: this.post._id,
          user: this.currentUser._id
        }
        this.$store.dispatch('savePost', params).then((res) => {
          console.log(res)
        }).catch( e => {
          console.log(e)
        })
      }else{
        this.$router.push({ name: 'login' });
      }
    },
    removePost(){
      if(this.isAuthenticated){
        var params = {
          post: this.post._id,
          user: this.currentUser._id
        }
        this.$store.dispatch('removePost', params).then((res) => {
          console.log(res)
        }).catch( e => {
          console.log(e)
        })
      }else{
        this.$router.push({ name: 'login' });
      }
    }
  }
};
</script>
<style src="./common.css">
</style>
