<template>
  <div
    class="loader-container show"
    :class="{&quot;show&quot;: get_page_loading, &quot;hidden&quot;: !get_page_loading}"
  >
    <div class="loading">
      <img
        class="rotate"
        src="../assets/stewie.png"
      >
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	  computed: {
    ...mapGetters(['get_page_loading']),
  },
	
}
</script>
<style scoped>
.loader-container {
  position: fixed;
  width: 100%;
  height: 100%;
  /* background: rgba(0,0,0,0.8); */
  padding-top: 15%;

}
img{ 
	width:200px;
	height:200px;
}
.rotate {
  animation: rotation 4s infinite linear;
  border-radius: 5%;
  padding: .5rem;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.show {
  visibility: visible;
  opacity: 1;
  z-index: 1;
  transition: opacity 0.5s ease-out, visibility 0.5s ease-out, z-index 0.5s ease-out;
}
.hidden {
  opacity: 0;
  visibility: hidden;
  z-index: 0;
}
</style>