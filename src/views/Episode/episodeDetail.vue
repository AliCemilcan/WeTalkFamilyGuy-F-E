<template>
  <div class="episode-view">
    <div class="episode-top">
      <span>
        <a @click="goToSeason()"><span class="underlined">Season {{ getCurrentEpisode.seasonNumber }}</span></a> > Episode {{ getCurrentEpisode.episodeNumber }}
        
      </span>
    </div>
    <div class="episode-main-display">
      <div class="message-display">
        <div class="watch-buttons">
          <h2 class="text-align-left">
            {{ getCurrentEpisode.title }}
          </h2>
          <span>
            <b-button
              pill
              variant="outline-secondary"
              @click="openNewPost()"
            > <b-icon
              
              icon="plus-square"
            /> Talk about it</b-button>
            
          </span>
        </div>
        <div
          v-for="post in getCurrentEpisode.posts"
          :key="post._id"
        >
          <user-comment
            :post="post"
            :show-extra-season="false"
          />
        </div>
      </div>
      <div class="info-display">
        <div class="img-holder">
          <img
            class="episode-image"
            :src="getCurrentEpisode.image"
          >
        </div>
        <div class="watch-buttons">
          <button class="watch-button">
            <img
           
              src="../../assets/Netflix.svg"
            >
          </button>
          <button class="watch-button">
            <img
           
              src="../../assets/amazon.svg"
            >
          </button>
          <button class="watch-button">
            <img
           
              src="../../assets/imdb.svg"
            >
          </button>
        </div>
        <div class="img-holder border-episode-detail">
          <div class="align-items">
            <b-icon
              
              icon="exclamation-circle"
            />
            <span class="info-header">EPISODE INFO</span>
          </div>
          <div class="align-items row mt-2">
            <span class="">Title:  {{ getCurrentEpisode.title }}</span>
            <span class="">Launch Date: {{ getCurrentEpisode.released }}</span>
            <span class="">IMDB: {{ getCurrentEpisode.imDbRating }} / 10 - Votes <span class="font-size-14">{{ getCurrentEpisode.imDbRatingCount }}</span> </span>
            <span>{{ getCurrentEpisode.plot }}</span>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      ref="new-post"
      scrollable
    
      hide-header
      :footer-bg-variant="footerBgVariant"
      title="Start Something"
    >
      <div class="d-block text-center">
        <h3>Start Something!</h3>
        <b-form
          @submit="onSubmit"
          @reset="onReset"
        >
          <b-form-group
            id="input-group-1"
            class="mb-3 mt-3"
            label=""
            label-for="input-title"
          >
            <b-form-input
              id="input-title"
              v-model="new_post.title"
              type="email"
              placeholder="Title"
              required
            />
          </b-form-group>
          <b-form-group>
            <b-form-textarea
              id="textarea"
              v-model="new_post.content"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            />
          </b-form-group>
        </b-form>
      </div>
      <template
        id="new-post-footer"
        #modal-footer
      >
        <div class="w-100">
          <b-button
            pill
            variant="outline-danger"
          >
            DRAFT
          </b-button>
          <b-button
            type="submit"
            class="margin-left-1"
            pill
            variant="success"
            :disabled="input_disabled_submit"
            @click="onSubmit()"
          >
            POST
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import userComment from '../common/userComment'
import { mapGetters } from 'vuex';
export default ({
  components: {
    userComment
  },
  props:{
    // currentEpisode:{
    //   type: Object,
    //   required: false,
    //   default: null
    // }
  },

  data() {
    return{ 
      new_post:{
        title:'',
        content:'',
      },
      footerBgVariant: '#f9f9f9'
    }
		
  },
  computed: {
    ...mapGetters(['currentUser', 'getCurrentEpisode', 'isAuthenticated']),
    input_disabled_submit(){
      return this.new_post.title == ''
    }
  },
  created () {
    var params = {
      filters:{
        seasonNumber: this.$route.params.season_id,
        episodeNumber: this.$route.params.episode_id
      }
    }
    this.$store.dispatch('getEpisode', params).then(() => {
    })
  },
  methods: {
    sendUserLoginPage(){
      if(this.isAuthenticated && Object.keys(this.currentUser).length === 0){
        //get User Information
        this.$store.dispatch('checkAccessToken').then(res => {
          console.log(res)
        }).catch(e => {
          console.log(e)
          this.$store.dispatch('logOut').then(() => {
            console.log('????')
            this.$router.push({ name: 'login' });
          });
        });
      } else if(Object.keys(this.currentUser).length === 0){
        this.$router.push({ name: 'login' });
        return
      }
    },
    goToSeason(){
      this.$router.push({ name: 'season', params: {id: this.getCurrentEpisode.seasonNumber}});

    },
    openNewPost(){
      this.sendUserLoginPage()
      this.$refs['new-post'].show()
    },
    onReset(){

    },

    onSubmit(){
      this.sendUserLoginPage()

      var params = {
        title: this.new_post.title,
        content: this.new_post.content,
        createdBy: this.currentUser._id,
        episodeID: this.getCurrentEpisode._id
      }

      this.$store.dispatch('createPost', params).then(() => {
        this.$refs['new-post'].hide()
      }).catch( e => {
        console.log(e)
     
      })

    }

  }
})
</script>
<style>
button:hover{
  box-shadow: 0 0 32px 0 #cacde1;
}
b-button:hover{
    box-shadow: 0 0 32px 0 #cacde1;

}
.episode-view {
  padding: 1rem 2px 1rem 2rem;
  height: 95%;
}
.episode-top{
	text-align: left;
    padding: 1rem 0rem;

}
.message-display h2{
	font-weight: 700;
}
.text-align-left{
	text-align: left;
}
.episode-main-display{
	display: flex;
	flex-flow: row;
	justify-content: space-between;
	gap: 1rem;
}
.message-display{
	width: 60%;
}
.img-holder{
	/* width: 400px; */
	height: 320px;
	border-radius: 16px;
}
.info-display{
  width: 35%;
}
.episode-image{
	 width: 100%;
    height: 19rem;
    border-radius: 16px;
}
.underlined{
  text-decoration: underline;
}
.underlined:hover{
  color: var(--magenta) !important;
}
button:hover{
  color: var(--magenta) !important;

}
.watch-buttons{
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

}
.watch-button{
    border: 2px solid #E5E5E5;
    box-sizing: border-box;
    border-radius: 16px;
    padding: 1rem;
    background-color: white;
    width: 120px;
    height: 66px;
}
.watch-button img{
    width: 32px;
    height: 33px;
}
.border-episode-detail{
   border: 2px solid #E5E5E5;
  box-sizing: border-box;
  border-radius: 16px;
  text-align: left;
  padding: 0.8rem 1rem;
}
.info-header{
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;

}
.position-top-left{
  /* position: relative;
  top: 0px;
  left: 0px; */
}
.align-items{
  align-items: center;
  display: flex;
  justify-content: flex-start;
  gap: 0.6rem;
}
.modal-footer{
  background-color: var(--grey);
  text-align: end;
}
#new-post-footer{
  background-color: var(--grey);
}
.margin-left-1{
  margin-left: 1rem;
}
</style>
