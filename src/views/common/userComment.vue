<template>
  <div class="mt-1 mb-2">
    <div class="hot-topic-border font-family-roboto">
      <a @click="showComments()">
        <div class="hot-topic-flex">
       
          <span class="user-episode"> <b>@</b>{{ post.userName }} </span>
          
          <span class="date-episode ml-auto mr-1"> {{ ISODateTimePrettier(post.created_at) }} </span>
          <span>
            <a @click="savePost()">
              <b-icon
                :class="[userAlreadyUpvoted]"
                icon="bookmark-plus"
                aria-hidden="true"
                class="small-button-shadow vertical-align-reset"
              /> </a> 

          </span>
          
          <span
            v-if="showExtraSeason"
            class="season-episode-bubble"
          >
            <span
              class="bubble-inline-text"
            >{{ post.SeasonEpisode }}/span>
            </span>
          </span>
        </div>
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
        v-for="c in post.comments"
        v-else-if="!show_only_title"
        :key="c"
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


    }
  }
};
</script>
<style src="./common.css">
</style>
