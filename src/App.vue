<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark" style="color:white;">
      <h5>Online Gradebook</h5>
      
      <div v-if="!isAuthenticated">
        <router-link to="/login" style="color:white;">Login</router-link> 
      </div>
      <div v-if="isAuthenticated">
        <a href="#" @click="logout"  style="color:white;">Logout</a> 
      </div>
      <div v-if="!isAuthenticated">
         <router-link to="/register" style="color:white;">Register</router-link> 
      </div>

      <router-link to="/teachers" style="color:white;">All professors</router-link> 
      <router-link to="/professors/create" style="color:white;">Add professor</router-link> 
      <router-link to="/my-gradebook" style="color:white;">My Gradebook</router-link> 
      <router-link to="/gradebooks/create" style="color:white;">Add Gradebook</router-link> 
      
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

<style>
h5 {
  color:#aaf0d1;
}
</style>
