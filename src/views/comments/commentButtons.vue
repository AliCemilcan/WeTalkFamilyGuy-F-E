<template>
  <div>
    <div class="mt-1 comment-icons">
      <span>
        <a @click="openReplyArea()">
          <b-icon
            icon="reply-fill"
            aria-hidden="true"
            class="small-button-shadow"
          /> </a>
      </span>

      <span>
        <a @click="upVote()">
          <b-icon

            icon="arrow-up"
            aria-hidden="true"
            class="small-button-shadow"
            :class="[userAlreadyUpvoted]"
          />
        </a>
        <span class="chat-text">{{ post.upVotes.length }}</span>
      </span>
       
      <span>
        <a @click="openCommentsAll()">
          <b-icon
            icon="chat-right-text-fill"
            aria-hidden="true"
            class="small-button-shadow"
          />
        </a>

        <span class="chat-text"> {{ post.comments.length }} </span>


      </span>
    </div>
  </div>
</template>
<script>
import commentMixin from '../../mixins/commentMixin';
import { mapGetters } from 'vuex';
export default {
  mixins: [commentMixin],
  props:{
    post:{
      type: Object,
      default: function () {
        return '';
      },
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated']),
    userAlreadyUpvoted(){
      if(this.currentUser){
        if(this.post.upVotes.includes(this.currentUser._id)){
          return 'already-voted'
        }else{
          return ''
        }
      }else{
        return 'unauthorized'
      }
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
    sendUserLoginPage(){
      if(!this.isAuthenticated){
        console.log('?????')
        this.$router.push({ name: 'login' });

        return
      }else if(Object.keys(this.currentUser).length === 0){
        this.$store.dispatch('checkAccessToken').then(res => {
          console.log(res)
        }).catch(e => {
          console.log(e)
          this.$store.dispatch('logOut').then(() => {
            this.$router.push({ name: 'login' });
          });
        });
      }
    },
	  openReplyArea(){
      this.sendUserLoginPage();
		  this.$emit('openReplyArea')
	  },
    upVote(){
      this.sendUserLoginPage();
      var params = {
        id: this.post._id,
        user: this.currentUser._id
      }
      this.$store.dispatch('upVoteComment', params).then((res) => {
        console.log(res)
      }).catch( e => {
        console.log(e)
      })

    }
  }
}
</script>
