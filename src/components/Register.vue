<template>
    <div>
        <form @submit.prevent="register" class="registerForm">
            <h3>Register</h3>
            <input type="text" name="firstName" placeholder="First name..." v-model="firstName" class="form-control" pattern=".{1,255}" required title="Max 255 characters" />
            <input type="text" name="lastName" placeholder="Last name..." v-model="lastName" class="form-control" pattern=".{1,255}" required title="Max 255 characters" />
            <input type="email" name="email" placeholder="Email..." v-model="email" class="form-control" required pattern=".{1,255}" title="Max 255 characters" />
            <input type="password" name="password" placeholder="Password..." v-model="password" class="form-control" required pattern="(?=.*\d).{8,}" title="Min 8 characters, must include at least one digital." />
            <input type="password" name="passwordConfirm" placeholder="Confirm password..." v-model="passwordConfirm" class="form-control" required />
            <div class="form-control" id="checkboxHelp">
                <input type="checkbox" required title="Please confirm terms of use" />
                <span> I accept terms and conditions</span>
            </div>
            <button type="submit" class="btn btn-info" @click="passwordError">Register</button>
            <p style="color:#ef5656;" >{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import { authService } from '../services/Auth.js'
export default {
    data() {
        return {
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            passwordConfirm:'', 
            errorMessage:'',
            isAuthenticated: false,
        }
    }, 

    created() {
      this.isAuthenticated = authService.isAuthenticated();
    },

    methods: {
        register() {
            authService.register(this.firstName, this.lastName, this.email, this.password)
            .then(() => {
                this.isAuthenticated = true
                this.$bus.$emit('logged', 'user')
                this.$router.push({ name: "gradebooks" });
            });
        },

        passwordError() {
            if ( this.password !== this.passwordConfirm) {
                this.password = ''
                this.passwordConfirm = ''
                this.errorMessage = 'Password confirmation error!'
            }
        }
    }

}
</script>

<style>
.registerForm {
        width:50%;
        margin: 0 auto;
        margin-top:1rem;
    }

    form input, form button, #checkboxHelp {
        margin-bottom:0.5rem;
    }

</style>
