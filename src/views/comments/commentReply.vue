<template>
  <div class="padding-1">
    <b-form
      class="reply-single-comment"
      @submit="onSubmit"
    >
      <b-form-textarea
        id="textarea"
        v-model="reply_content"
        placeholder="What you saying about it..."
        rows="3"
        max-rows="6"
      />
      <div class="text-right mt-1 mb-1">
        <b-button
          :disabled="input_disabled_submit"	
          variant="outline-danger"
          @click="closeModal()"
        >
          Delete
        </b-button>
        <b-button
          type="submit"
          class="margin-left-1"
          variant="success"
          :disabled="input_disabled_submit"
        >
          Reply
        </b-button>
      </div>
    </b-form>
  </div>
</template>
<script>
export default {
  data(){
    return{
      reply_content:''

    }
  },
  computed: {
	  input_disabled_submit(){
		  return this.reply_content == ''
	  }
  },
  methods: {
    onSubmit(){
			
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
</style>