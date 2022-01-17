<template>
  <div class="header-section">
    <section id="navbar">
      <nav>
        <ul class="nav-menu">
          <li>
            <router-link :to="{ name: 'season', params: {id: 1 } }">
              <a>We just talk about
                <h3>Family Guy</h3>
              </a>
            </router-link>
          </li>
          
    
          <li>
            <a
              class="nav-link"
              href="https://github.com/AliCemilcan"
              target="_blank"
            > <b-icon
              icon="github"
              scale="1"
              variant="" 
            /></a>
          </li>
          <li v-if="isAuthenticated">
            <router-link :to="{ name: 'settings' }">
              <b-icon
                icon="person-lines-fill"
                scale="1"
                variant="" 
              />
            </router-link>
          </li>
          <li v-if="!isAuthenticated">
            <router-link
              exact
              :to="{ name: 'login' }"
            >
              <b-icon
                icon="person-square"
                scale="1"
                variant="" 
              />
            </router-link>
          </li>
        </ul>
        <div class="hamburger">
          <span class="bar" />
          <span class="bar" />
          <span class="bar" />
        </div>
      </nav>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {};
  },
  mounted(){

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLink = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', mobileMenu);
    navLink.forEach(n => n.addEventListener('click', closeMenu));

    function mobileMenu() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    }

    function closeMenu() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');

    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated'])
  },
  methods: {
    logout() {
      this.$store.dispatch('logOut').then(() => {
        this.$router.push({ name: 'login' });
      });
    }
  }
};
</script>

<style>
:root{
  color-scheme: ligt dark;
  --primary-background: #6a73b6;
  --secondary-background: #1565c0;
  --magenta: #e310cb;

  --white: #FFFF;
}

@media (prefers-color-scheme: dark){
  :root{
    --primary-background: #35395B;
    --secondary-background: #0A3260;
  }
}
.hamburger, .hamburger-text {
    display: none;
}
.bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    background-color: #101010;
}
nav{
  background-color: var(--white);
  box-shadow: 0 0 32px 0 #cacde1;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 82%;
  padding: 0.5rem 1rem;
}
nav h1 a{
  font-family: Roboto;
}
li a{
  cursor: pointer;
}
nav ul{
  font-family: Roboto;
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding-right: 8rem;
}
nav li:first-child{
  flex-basis: 100%;
  text-align: center;
  text-align: left;
  padding-left: 10%;
 
}
nav a, .nav-link{
  color: #2c3e50 !important;
  text-decoration: none;
  display:block;
}
ul li a h3{
  position: relative;
  left: -10px;
}
nav a:hover, .nav-link:hover{
  color: var(--magenta) !important;
}


@media all and (max-width: 700px) {
  .hamburger {
      display: block;
      cursor: pointer;
      position: relative;
      top: -40px;
      float: right;
    }
    .hamburger-text{
      width: 70%;
    }
    .header{
      top: 3rem !important;
    }
    nav{ 
      padding: 0 !important;
    }
    nav ul {
        position: fixed;
        left: -100%;
        top: 0rem;
        flex-direction: column;
        background-color: #fff;
        width: 100%;
        border-radius: 10px;
        text-align: center;
        transition: 0.3s;
        gap: 1rem;
        padding: 1rem;
        padding-right: 0rem;
        box-shadow:
            0 10px 27px rgba(0, 0, 0, 0.05);
    }
   .nav-menu.active {
        left: 0;
    }
}
</style>
