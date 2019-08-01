<template>
    <div>
        <form @submit.prevent="login" class="loginForm">
            <h3>Login</h3>
            <input type="email" name="email" placeholder="Email..." v-model="email" class="form-control" required title="Plese insert your email" />
            <input type="password" name="password" placeholder="Password..." v-model="password" class="form-control" required />
            <button type="submit" class="btn btn-info" >Log in</button>
            <p style="color:#ef5656;" >{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import { authService } from '../services/Auth.js'
export default {
    data() {
        return {
            email:'',
            password:'',
            errorMessage:'',
        }
    }, 

    created() {
         this.$bus.$emit('logged', 'user')
    },

    methods: {
        login() {
            authService.login(this.email, this.password)
            .then(() => {
                this.$bus.$emit('logged', 'user')
                this.$router.push({ name: "gradebooks" })
            })
            .catch(() => {
                this.errorMessage = 'Wrong credentials!';
            })
        }, 
    }
}
</script>

<style>
.loginForm {
    width:50%;
    margin: 0 auto;
    margin-top:1rem;
}

form input, form button {
    margin-bottom:0.5rem;
}
</style>

