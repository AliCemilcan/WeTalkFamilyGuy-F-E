<template>
  <div>
    <div class="hot-topic-border">
      <a @click="showComments()">
        <div
          class="hot-topic-flex"
        >
          <span class="user-episode"> @{{ comments.userName }} </span>
          <span class="date-episode"> 12/10/2021 - 10:19 PM </span>
          <span
            v-if="showExtraSeason"
            class="season-episode-bubble"
          >
            <span
              class="bubble-inline-text"
            >{{ comments.SeasonEpisode }}/span>
            </span>
          </span>
        </div>
        <div class="episode-title margin-left-10 mt-1">
          <span>
            {{ comments.title }}
          </span>
        </div>
      </a>
      <comment-buttons
        :comments="comments"
        @openReplyArea="openReplyArea"
        @openCommentsAll="openCommentsAll"
      />
      <comment-reply
        v-if="open_reply"
        @closeReplyModal="openReplyArea()"
      />
      <div v-if="comments.comment && show_one_comment && !show_only_title">
        <single-comment :comments="comments.comment[0]" />
      </div>
      <div
        v-for="c in comments.comment"
        v-else-if="!show_only_title"
        :key="c.title"
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
import commentReply from './commentReply.vue';
import commentButtons from './commentButtons.vue';
import commentMixin from '../../mixins/commentMixin';
export default {
  name: 'SingleComment',
  components: { commentReply, commentButtons },
  mixins:[commentMixin],
  props: {
    nestedComment: {
      type: Boolean,
      default: false,
    },
    comments: {
      type: Object,
      default: function () {
        return '';
      },
    },
  },
  data() {
    return {
      open_reply: false,
      show_one_comment: true,
      showExtraSeason: false,
      show_only_title: false
    };
  },
  methods: {
    // openCommentsAll(){
    //   this.show_one_comment = !this.show_one_comment
    // },
    // openReplyArea() {
    //   this.open_reply = !this.open_reply;
    // },
  },
};
</script>