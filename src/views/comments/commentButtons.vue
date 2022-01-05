<template>
  <div>
    <div class="mt-1 comment-icons">
      <span>
        <a @click="openReplyArea()">
          <b-icon
            icon="reply-fill"
            aria-hidden="true"
          /> </a>
      </span>

      <span>
        <b-icon
          icon="arrow-up"
          aria-hidden="true"
        />
        <span class="chat-text">{{ comments.likes }}</span>
      </span>
       
      <span>
        <a @click="openCommentsAll()">
          <b-icon
            icon="chat-right-text-fill"
            aria-hidden="true"
          />
        </a>

        <span class="chat-text"> {{ comments.messages }} </span>


      </span>
    </div>
  </div>
</template>
<script>
import commentMixin from '../../mixins/commentMixin';
export default {
  mixins: [commentMixin],
  props:{
    comments:{
      type: Object,
      default: function () {
        return '';
      },
    }
  },
  data(){
    return{
		

    }
  },
  methods: {
	  openCommentsAll(){
		  this.$emit('openCommentsAll')
	  },
	  openReplyArea(){
		  this.$emit('openReplyArea')
	  }
  }
}
</script>