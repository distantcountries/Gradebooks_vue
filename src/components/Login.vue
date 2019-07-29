<template>
    <div>
        <form @submit.prevent="login">
            <h3>Login</h3>
            <input type="text" name="email" placeholder="Email..." v-model="email" class="form-control" />
            <input type="text" name="password" placeholder="Password..." v-model="password" class="form-control" />
            <button type="submit" class="btn btn-info">Log in</button>
        </form>
    </div>
</template>

<script>
import { authService } from '../services/Auth.js'
export default {
    data() {
        return {
            email:'',
            password:''
        }
    }, 

    methods: {
      login() {
        authService.login(this.email, this.password)
          .then(() => {
            this.$router.push({ name: "gradebooks" })
          })
          .catch(() => {
            this.errorMessage = 'Something wrong with login!';
          })
      }, 
    }
}
</script>

<style>
    form {
        width:50%;
        margin: 0 auto;
        margin-top:1rem;
    }

    form input, form button {
        margin-bottom:0.5rem;
    }
</style>

