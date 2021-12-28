<template>
  <div id="app">
    <Header class="header" />
    <vue-snotify />
    <router-view id="main-view" />
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style>
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
:root {
  color-scheme: ligt dark;
  --app-color: #2c3e50;
  --primary-background: #6a73b6;
  --black: #171321;
  --magenta: #e310cb;
  --secondary-background: #1565c0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --app-color: #233240;
    --primary-background: #35395b;
    /* --primary-background: #FFFF; */
    --secondary-background: #0a3260;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: var(--white);
  box-shadow: 0 0 32px 0 #cacde1;
  /* margin-top: 40px; */
  /* width: 95% !important; */
  /* margin-left: auto;
  margin-right: auto; */
}
#main-view{
  padding: 0% 5% 0% 5%;

}
.header {
  position: sticky;
  top: 0px;
  z-index: 2 !important;
}
body {
  background-color: var(--black);
  height: 100% !important;
}
h1,h2,h3,h4{
  margin: 0;
}
</style>
