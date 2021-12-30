
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
          <div class="flex episode-border">
            <a @click="addToDB(e)">
              <img
                class="episode_img_holder"
                :src="e.image"
              >
            </a>
            <div class="text-area">
              <span class="episode-number">Episode {{ e.episodeNumber }}</span>
              <br>
              <div class="episode-title margin-left-10 mt-2">
                <span>"{{ e.title }}"</span>
              </div>
              <!-- <p>{{ e.plot }}</p> -->
              <div class="flex-col">
                <div>
                  <!-- <img
                    class="chat_icon_size"
                    src="../assets/Vector.png"
                  > -->
                  <b-icon
                    icon="chat"
                    aria-hidden="true"
                  />
                  <span class="chat-text">
                    {{ e.imDbRating }}
                  </span>
                </div>
                <div>
                  <i
                    class="fa fa-imdb"
                    style="font-size: 38px"
                  />

                  <span class="rating-text">
                    {{ e.imDbRating }}
                  </span>
                </div>
                <div class="start_thread">
                  <span class="start-thread"> START A THREAD </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="topic_list">
        <h3>Hot Topics</h3>
        <div
          v-for="(e, index) in get_current_season"
          :key="index"
          class="col"
        >
          <div class="hot-topic-border">
            <div>
              <span class="user-episode"> @username </span>
              <span class="date-episode"> 12/10/2021 - 10:19 PM </span>
              <span class="season-episode-bubble">
                <span class="bubble-inline-text">Se1 Ep1</span>
              </span>
            </div>
            <div class="episode-title margin-left-10 mt-1">
              <span>I love this episode becasuse I love Zohar</span>
            </div>
            <div class="mt-1">
              <span>
                <b-icon
                  icon="chat"
                  aria-hidden="true"
                />
                <span class="chat-text"> 122 </span>

              </span>
              <span>
                <img
                  class="upvote-icon"
                  src="../assets/upvote.png"
                >
                <span class="chat-text">133</span>

              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
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
    ...mapGetters(['get_current_season']),
  },
  methods: {
    addToDB(e) {
      console.log(e);
      // e.seasonEpisode = 'S'+e.seasonNumber+'E'+e.episodeNumber
      // this.$store.dispatch('createEpisode', e).then((res) => {
      //   console.log(res)
      // });

      this.get_current_season.forEach((elem) => {
        elem.seasonEpisode = 'S' + elem.seasonNumber + 'E' + elem.episodeNumber;
        this.$store.dispatch('createEpisode', elem).then((res) => {
          console.log(res);
        });
      });
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
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
}
.episode_list {
  padding: 12px;
  width: 55%;
}
.topic_list {
  padding: 16px;
  width: 45%;
}
.episode_img_holder {
  max-width: 250px;
  max-height: 150px;
  min-width: 250px;
  min-height: 150px;
  border-radius: 16px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.episode_img_holder:hover {
  transform: scale(1.1) rotate(4deg);
}
.col {
  flex: 0 0 100% !important;
  padding: 12px 12px 12px 26px;
}
.flex {
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
  width: 62px;
  height: 23px;
  margin-left: 26  %;
}
.bubble-inline-text {
  margin: 4px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
}
.season_list {
    display: flex;
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
  position: absolute;
  bottom: 0.4rem;
}
.text-area {
  text-align: left;
  padding: 8px 4px 8px 16px;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-radius: 16px;
  box-shadow: 0 0 20px 0 #cacde1;
  width: -webkit-fill-available;
}
.upvote-icon {
  margin-right: 2px;
  vertical-align: -11px;
  height: 22px;
}
.margin-left-10 {
  margin-left: 10px;
}
.rating-text {
  font-family: Oxygen;
  font-size: 18px;
  font-weight: 500;
  position: relative;
  bottom: 6px;
}
.chat-text {
  vertical-align: -8px;
  font-family: Oxygen;
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
  vertical-align: -0.9em;
}
.episode-border {
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 16px;
}
.hot-topic-border {
  display: flex;
  flex-flow: column;
  gap: 6px;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 16px;
  text-align: left;
  padding: 8px 4px 8px 16px;
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
@media all and (max-width: 700px) {
  .flex {
    gap: 0.1rem;
  }
  .episode_img_holder {
    max-width: none;
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
@media all and (max-width: 1070px) {
  .episode_list,
  .topic_list {
    width: 100%;
  }
  .season_list {
    flex-flow: column;
  }
  .episode_img_holder {
    max-width: 110px;
    min-width: 110px;
  }
 
}
@media all and (max-width: 1270px) {
  .episode_img_holder {
    max-width: 200px;
    min-width:200px;
  }
}
</style>
