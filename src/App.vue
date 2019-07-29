<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark" style="color:white;">
      
      <div v-if="!isAuthenticated">
        <router-link to="/login" style="color:white;">Login</router-link> 
      </div>
      <div v-if="isAuthenticated">
        <a href="#" @click="logout"  style="color:white;">Logout</a> 
      </div>
      <div v-if="!isAuthenticated">
         <router-link to="/register" style="color:white;">Register</router-link> 
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
    methods: {
      logout() {
        authService.logout()
        this.$router.push('/login')
      }
    }
  }
</script>