<template>
  <div class="padding-1 mt-1">
    <b-form
      class="reply-single-comment"
      @submit.prevent="onSubmit"
    >
      <div class="text-group">
        <b-form-textarea
          id="textarea"
          v-model="reply_content"
          placeholder="What you saying about it..."
          rows="3"
          max-rows="6"
        />
        <span
          class="emoji-inside-text-area cursor-pointer"
        >
          <a @click="toogleDialogEmoji"> 😃</a>
         
        </span>
      </div>

     

      <div class="text-right mt-1 mb-1">
        <b-button
          size="sm"
          :disabled="input_disabled_submit"	
          variant="danger"
          @click="closeModal()"
        >
          Delete
        </b-button>
        <b-button
          size="sm"
          type="submit"
          class="margin-left-1"
          variant="success"
          :disabled="input_disabled_submit"
        >
          Reply
        </b-button>
      </div>
      <VEmojiPicker
        v-show="showDialog"
        :style="{ width: '440px', height: '200' }"
        label-search="Search"
        lang="pt-BR"
        @select="onSelectEmoji"
      />
    </b-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { VEmojiPicker, emojisDefault, categoriesDefault } from 'v-emoji-picker';
export default {
  components: {
    VEmojiPicker
  },
  props:{
    postId:{
      type: String,
      required: true
    },
    childComment:{
      type: Boolean,
      default: false
    },
    mainPost: {
      type: String,
      default: ''
    },
  },
  data(){
    return{
      reply_content:'',
      showDialog: false
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
	    input_disabled_submit(){
		  return this.reply_content == ''
	  }
  },
  mounted() {
    console.log(categoriesDefault);
    console.log('Total emojis:', emojisDefault.length);
  },
  methods: {
    onSelectEmoji(emoji) {
      this.reply_content += emoji.data;
      // Optional
      // this.toogleDialogEmoji();
    },
    toogleDialogEmoji() {
      console.log('Toogle!');
      this.showDialog = !this.showDialog;
    },
    onSubmit(){
      console.log('submit?', this.childComment)
      var params = {
        text: this.reply_content,
        createdBy: this.currentUser._id,
        userName: this.currentUser.userName
      }
      if(this.childComment){
        params.parentID = this.postId
      }else{
        params.postID = this.postId
      }
      this.$store.dispatch('createComment', params).then((res) => {
	      this.$emit('closeReplyModal')
        console.log(res)
      }).catch( e => {
        console.log(e)
      })
			
    },
    closeModal(){
      this.reply_content = ''
	    this.$emit('closeReplyModal')
    }
  }
}
</script>
<style>
.reply-single-comment{
	background-color: var(--grey);
	padding: 0;
	border-radius: 6px;
}
.text-right{
	text-align: right;
	padding: 0.2rem;
}
.padding-1{
	padding: 0.2rem 0.5rem;
}
.text-group{
  position: relative;
}
.emoji-inside-text-area{
    position: absolute;
    top: 60px;
    left: 6px;
}
</style>