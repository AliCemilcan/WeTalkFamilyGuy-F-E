<template>
  <div class="general-view">
    <div class="home-banner">
      <h2>Let's Talk About Family Guy</h2>
    </div>
    <div class="overview">
      <div class="info-section">
        <!-- <div class="col-4 image-holder">
          <img
            src="../assets/familyguy.png"
            class="info-image"
          >
        </div> -->
      </div>
      <div class="season-section">
        <div class="pick-season">
          <span class="align-text-center">
            Pick a season
          </span>
        </div>
        <div class="button-container">
          <button
            v-for="(season, index) in seasonList"
            :id="index"
            :key="season._id"
            class="button-season-list"
            :class="index + 1 == current_season ? 'active-button' : ''"
            @click="fetch(index + 1)"
          >
            {{ index + 1 }}
          </button>
        </div>
      </div>
      <div>
        <season-view :active-season="Number(current_season)" />
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
import seasonView from '../views/seasonView.vue';
export default {
  name: 'Home',
  components: { seasonView },
  data() {
    return {
      seasonList: [],
      current_season: this.$route.params.id || 1,
    };
  },
  watch: {
    '$route.params.id': {
      handler: function(season_number) {
        if (season_number) {
          this.fetch(Number(season_number));
        }
      },
      deep: true,
      immediate: true
    },
  },
  created() {
    this.fetch(Number(this.current_season));
    for (let i = 0; i < 21; i++) {
      this.seasonList.push(i);
    }
  },
  methods: {
    fetch(index) {
      var params = {
        // id: 'tt0182576',
        filters:{
          seasonNumber: index,
        }
      };
      // const apikey = 'k_y7s2rd5h';
      this.$store.dispatch('getSeason', params).then((response) => {
        if (index != this.current_season) {
          this.$router.push({ name: 'season', params: { id: index } });
          this.current_season = index;
        }
        this.$store.commit('set_current_season', response.episodes);
      });

      // axios.get('https://imdb-api.com/en/API/SeasonEpisodes/'+apikey+'/'+params.id+'/'+params.seasonNumber)
      //   .then((response) => {
      //     this.$store.commit('set_current_season', response.data.episodes)
      //   })
    },
  },
};
</script>

<style scoped>
:root {
  color-scheme: ligt dark;
  --primary-background: #6a73b6;
  --white: #fff;
  --secondary-background: #030303;
  --header-font: "Roboto Mono", monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
    --secondary-background: #0a3260;
  }
}

.active-button {
  background-color: var(--primary-background) !important;
}

h2 {
  color: canvas;
  font-family: "Roboto Mono", monospace;
}
.button-season-list {
  font-family: Roboto;
  font-size: 1rem;
  font-weight: 600;
  margin: 8px 6px 8px 6px;
  outline: none;
  height: 25px !important;
  padding: 0px 0px 2px 0px;
  cursor: pointer;
  border-radius: 15px;
  color: black;
  background: rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.15);
  width: 105px !important;
}
.button-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.pick-season{
  font-family: Roboto;
  font-size: 150%;
  font-weight: 700;
  width: 100%;
  display: flex;
  justify-content: center;

}
.align-text-center{
  vertical-align: middle;
  display: inline-block;
}
.season-section {
  display:flex;
  background-color: var(--white);
  padding: 0.5rem;
  color: canvas;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  border-top: none;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}
.home-banner {
  margin: 1rem;
  background-color: var(--white);
  text-align: center;
}

.overview {
  background-color: var(--white);
  overflow: hidden;
}
.general-view {
  /* overflow: auto; */
  padding: 0px 0px 20px 0px;
  height: 95%;
  /* width: 95% !important;
  margin-left: auto;
  margin-right: auto; */
}
.info-section {
  /* background-color: var(--primary-background); */
  height: 300px;
  padding: 16px;
  color: canvas;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../assets/familyguy.png");
}
.info-image {
  border-radius: 8px;
  /* height: 100%; */
  height: 212px;
  width: auto;
}

.image-holder {
  /* max-width: 400px !important; */
}
@media only screen and (max-width: 600px) {
  .info-image {
    width: 150px !important;
  }
  .general-view {
    width: 100% !important;
  }
  .button-season-list {
    max-width: 28%;
  }
  .button-container{
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .season-section{
    flex-flow: column;
    align-items: center;
  }
  
}
@media only screen and (max-width: 900px) {
  .season-section{
      flex-flow: column;
      align-items: center;
    }
  .button-container{
    justify-content: center;
  }

}

</style>
