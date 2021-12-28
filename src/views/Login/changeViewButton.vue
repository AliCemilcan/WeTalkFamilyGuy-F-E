<template>
  <div>
    <div class="login-choice">
      <router-link :to="{ name: routerText }">
        <span class="sign-up-button-text">or {{ text }}</span>
      </router-link>
    </div>
  </div>
</template>
<script>

export default {
  props:{
    text:{
      required: true,
	  type: String
    },
    routerText:{
      required: true,
	  type: String
    }

  }
}
</script>
<style src="./login.css">

</style>
