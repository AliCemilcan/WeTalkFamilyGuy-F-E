<template>
  <div>
    <div class="user-comment-border">
      <a @click="showComments('child')">
        <div
          class="hot-topic-flex"
        >
          <span class="user-comment-text"> @{{ comments.userName }} </span>
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
        <div class="mt-1">
          <span>
            {{ comments.text }}
          </span>
        </div>
      </a>
      <comment-buttons
        :post="comments"
        @openReplyArea="openReplyArea"
        @openCommentsAll="openCommentsAll"
      />
      <comment-reply
        v-if="open_reply"
        :child-comment="true"
        :post-id="comments._id"
        :main-post="mainPost"
        @closeReplyModal="openReplyArea()"
      />
      <!-- <div v-if="comments.comment && show_one_comment && !show_only_title">
        <single-comment :comments="comments.comment[0]" />
      </div> -->
      <div 
        v-if="comments.childComments && open_reply"
      >
        <div
          v-for="c in child_comments"

          :key="c.title"
        >
          <single-comment
            :nested-comment="true"
            :comments="c"
          />
        </div>
      </div>
      
      <!-- <div
        v-for="c in comments.comment"
        v-else-if="!show_only_title"
        :key="c.title"
      >
        <single-comment
          :nested-comment="true"
          :child_comments="c"
        />
      </div> -->
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
    mainPost: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      open_reply: false,
      show_one_comment: true,
      showExtraSeason: false,
      show_only_title: false,
      child_comments: []
    };
  },
  methods: {
  },
};
</script>