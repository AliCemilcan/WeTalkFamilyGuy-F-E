<template>
  <div class="mt-1 mb-2">
    <div class="hot-topic-border font-family-roboto">
      <a @click="showComments()">
        <div class="hot-topic-flex">
       
          <span class="user-episode"> <b>@</b>{{ post.userName }} </span>
          <span class="date-episode"> {{ ISODateTimePrettier(post.created_at) }} </span>
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
        :comments="post.comments"
        @openReplyArea="openReplyArea"
        @openCommentsAll="openCommentsAll"
      />
      
      <comment-reply
        v-if="open_reply"
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
      comments: {
        userName: 'AliCemilcan',
        SeasonEpisode: 'Se1Ep1',
        title: 'I love this episode becasuse I love Zohar',
        likes: 122,
        messages: 11,
        comment: [
          {
            userName: 'ZoharAtenas',
            SeasonEpisode: 'Se1Ep1',
            title: 'This is a comment',
            likes: 52,
            messages: 11,
            comment: [
              {
                userName: 'Ferzan',
                SeasonEpisode: 'Se1Ep1',
                title: 'I am not sure about that',
                likes: 2,
                messages: 3,
              },
            ],
          },
          {
            userName: 'Doruk',
            SeasonEpisode: 'Se1Ep1',
            title: 'Stop capping fam fam',
            likes: 992,
            messages: 1,
            comment: [
              {
                userName: 'VidddddMiami',
                SeasonEpisode: 'Se1Ep1',
                title: 'Fuck all the girls nigg',
                likes: 2,
                messages: 87,
              }
            ]
          },
        ],
      },
    };
  },
  methods: {
    openReplyArea(){
      this.open_reply = !this.open_reply
    }
  }
};
</script>
<style src="./common.css">
</style>
