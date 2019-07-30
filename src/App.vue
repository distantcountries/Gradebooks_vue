<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-light" style="color:white; padding:1rem 3rem 1rem 3rem;">
      <div>
        <img alt="Gradebook" src="./assets/book.png">
        <span id="logoText">Online Gradebook</span>
      </div>
      <div v-if="!isAuthenticated">
        <router-link to="/" style="color:#38a2b8;">Gradebooks</router-link><span class="betweenLinks"> | </span> 
        <router-link to="/login" style="color:#ef5656;">Login</router-link><span class="betweenLinks"> | </span> 
        <router-link to="/register" style="color:#ef5656;">Register</router-link> 
      </div>
      <div v-if="isAuthenticated">
        <router-link to="/" style="color:#38a2b8;">Gradebooks</router-link><span class="betweenLinks"> | </span> 
        <router-link to="/teachers" style="color:#38a2b8;">All professors</router-link><span class="betweenLinks"> | </span> 
        <router-link to="/professors/create" style="color:#38a2b8;">Add professor</router-link><span class="betweenLinks"> | </span> 
        <router-link to="/my-gradebook" style="color:#38a2b8;">My Gradebook</router-link><span class="betweenLinks"> | </span> 
        <router-link to="/gradebooks/create" style="color:#38a2b8;">Add Gradebook</router-link><span class="betweenLinks"> | </span> 
        <a href="#" @click="logout"  style="color:#ef5656;">Logout</a> 
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { authService } from './services/Auth'
  export default {
    data() {
      return {
        isAuthenticated: false, 
      }
    },
    created() {
      this.isAuthenticated = authService.isAuthenticated();
    },
    methods: {
      logout() {
        authService.logout()
        this.$router.push('/login')
      }, 
    }
  }
</script>

<style>
#logoText {
  color:#ef5656;
  font-size: 1.5rem;
  font-weight: bold;
}
img {
  width: 10%;
  height: 10%;
}
.betweenLinks {
  color: #38a2b8;
}
</style>