
<template>
  <div class="season-padding">
    <div class="season_list">
      <div class="episode_list">
        <h3>Episodes</h3>
        <div
          v-for="(e, index) in get_current_season"
          :key="index"
          class="col"
        >
          <a @click="openEpisode(e)">

            <div class="flex episode-border">
              <img
                class="season_img_holder"
                :src="e.image"
              >
              <div class="text-area">
                <div>
                  <span class="episode-number">EPISODE {{ e.episodeNumber }} </span>
                  
                  <span>
                    <b-button
                      class="hover-magenta"
                      variant="outline"
                    > <b-icon
                      icon="plus-square"
                    /> Start Something</b-button>
            
                  </span>
                </div>

                  
                
                <!-- <br> -->
                <div class="episode-title margin-left-10 mt-2">
                  <span>"{{ e.title }}"</span>
                </div>
                <!-- <p>{{ e.plot }}</p> -->
                <div class="flex-col">
                  <div class="icon-text-display">
                    <b-icon
                      icon="chat"
                      aria-hidden="true"
                    />
            
                    <span class="rating_text_season_view text-image-fit margin-left-4">
                      {{ e.imDbRating }}
                    </span>
                  </div>
                  <div class="icon-text-display">
                    <i
                      class="fa fa-imdb"
                      style="font-size: 38px"
                    />

                    <span class="rating_text_season_view margin-left-4">
                      {{ e.imDbRating }}
                    </span>
                  </div>
                  <!-- <div class="start_thread">
                    <span>
                      <b-button
                        class="hover-magenta"
                        pill
                        variant="outline"
                      > <b-icon
              
                        icon="plus-square"
                      /> Start Something</b-button>
            
                    </span>
                    
                  </div> -->
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="topic_list">
        <h3>🌶 Topics</h3>
        <div v-if="get_current_season_posts.length>0">
          <div
            v-for="(e, index) in get_current_season_posts"
            :key="index"
            class="col"
          >
            <user-comment
              :post="e"
              :show-extra-season="false"
            />
          </div>
        </div>
        <div
          v-else
          class="col"
        >
          <h5>Such Empty ..</h5> <h3>🤷‍♂</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import commentMixin from '../mixins/commentMixin';
import userComment from './common/userComment'
export default {
  components: {
    userComment
  },
  mixins: [commentMixin],
  props: {
    activeSeason: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  data: () => {
    return {};
  },
  computed: {
    ...mapGetters(['get_current_season', 'get_current_season_posts']),
  },
  methods: {
    openEpisode(e){
      this.$store.commit('openEpisode', e);
      this.$router.push({ name: 'episode_detail', params: { season_id:this.activeSeason, episode_id:e.episodeNumber } });

    },
  },
};
</script>
<style>
/* :root{
  --corner-size: 1em;
}
@property --corner-size{
	syntax: "*";
	inherits: false;
}
*{
  	clip-path: polygon(
		calc(100% - var(--corner-size)) 0,
		100% var(--corner-size),
		100% 100%, 0 100%, 0 0
	);
} */
p {
  text-align: justify;
}
h3 {
  font-family: Roboto;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
}
.episode-title {
  font-family: Roboto;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
}
.episode-number {
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
  color: #000000;
}
.episode_list {
  padding: 1rem 0rem 1rem 0.5rem;
  width: 60%;
}
.topic_list {
  padding: 1rem 0rem 1rem 0.5rem;
  width: 40%;
}
.icon-text-display{
  display: flex;
  align-items: center;
}
.season_img_holder {
  max-width: 250px;
  max-height: 148px;
  min-width: 250px;
  min-height: 148px;
  border-radius: 14px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.season_img_holder:hover {
  transform: scale(1.1) rotate(4deg);
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
}
.col {
  flex: 0 0 100% !important;
  padding: 1rem 0.5rem 1rem 0.5rem;
}
.flex {
  max-height: 152px;
  position: relative;
  z-index: 0 !important;
  /* --corner-size: 2em; */
  display: flex;
  background-color: #ffff;
  clip-path: polygon(
    calc(100% - var(--corner-size)) 0,
    100% var(--corner-size),
    100% 100%,
    0 100%,
    0 0
  );
}
.season-episode-bubble {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  height: 23px;
}
.bubble-inline-text {
  margin: 4px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
}
.season_list {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    border: 2px solid #E5E5E5;
    box-sizing: border-box;
    border-radius: 16px;
    font-family: Roboto;
}
.flex-col {
  display: flex;
  flex-flow: row;
  /* justify-content: space-between; */
  gap: 1rem;
  /* position: absolute;
  bottom: 0.4rem; */
}
.text-area {
    display: flex;
    flex-direction: column;
    gap: 0rem;
    row-gap: 0.7rem;
    text-align: left;
    padding: 5px 4px 8px 16px;
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
    border-radius: 16px;
    box-shadow: 0 0 20px 0 #cacde1;
    width: -webkit-fill-available;
}
.upvote-icon {
  margin-right: 2px;
  margin-left: 0.5rem;
  height: 22px;
}
.margin-left-10 {
  margin-left: 10px;
}
.rating_text_season_view {
  font-family: Oxygen;
  font-size: 18px;
  font-weight: 500;
}
.margin-left-4{
  margin-left: 4px;
}
.user-episode {
  font-size: 20px;
  color: #000000;
}
.date-episode {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-transform: lowercase;
  vertical-align: baseline;

  color: #595959;
}
.b-icon.bi {
  width: 24px;
  height: 24px;
  /* vertical-align: -0.9em; */
  display: inline-block;
  overflow: visible;
  /* vertical-align: -0.15em; */
  min-width: 1.5rem;
  min-height: 1.4rem;
}
.episode-border {
  cursor: pointer;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 16px;
}
.hot-topic-border {
  display: flex;
  flex-flow: column;
  gap: 5px;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 16px;
  text-align: left;
  padding: 8px 16px 8px 16px;
}
.text-image-fit{
  /* position: relative;
  top: 6px; */
}
.chat_icon_size {
  /* color: black; */
  margin-top: 6px;
  height: 28.124998092651367px;
  width: 26.666667938232422px;
  left: 2.6666641235351562px;
  top: 2.666656494140625px;
  border-radius: 0px;
}
.start-thread {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  font-family: Roboto;
  font-size: 14px;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
}
.season-padding{
  padding: 1rem 0rem;
}
.hover-magenta:hover{
  color: var(--magenta) !important;
  /* box-shadow: 0 0 28px 0 #cacde1; */
}
@media all and (max-width: 700px) {
  .flex {
    gap: 0.1rem;
    flex-direction: column;
    max-height: none !important
    
  }
  .season_img_holder {
    min-width: 100%;
    max-width: 100%;
    border-top-right-radius: 16px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .text-area{
    border-top-right-radius: 0px;
  }
  .episode_list{
    padding: 2px;
  }
  .episode_list,
  .topic_list {
    width: 100%;
  }
  .start_thread{
    display: none;
  }
}
.hot-topic-flex{
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
}
@media all and (max-width: 1070px){
  .episode_list,
  .topic_list {
    width: 100%;
  }
  .season_list {
    flex-flow: column;
    border: 0px;
  }
  .col{
    padding: 12px 0px 12px 0px;
  }
}
@media all and (max-width: 500px){
  .date-episode{
    display: none;
  }
}
@media all and (min-width: 701px) and (max-width: 1070px) {
  .episode_list,
  .topic_list {
    width: 100%;
    padding: 12px 0px 12px 0px;
  }
  .season_list {
    flex-flow: column;
  }
  .season_img_holder {
    max-width: 110px;
    min-width: 110px;
  }
  .text-area{
    padding: 8px 4px 8px 16px;
    row-gap: 0.5rem;
  }
  
 
}
@media all and (min-width: 1071px) and (max-width: 1270px) {
  .season_img_holder {
    max-width: 200px;
    min-width:200px;
    min-height: 150px;
    max-height: 150px;
  }
}
</style>
