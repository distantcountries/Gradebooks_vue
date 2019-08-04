import axios from 'axios'
export default class AuthService {

    constructor() {
        this.setAxiosDefaultAuthorizationHeader()
    }

    login(email, password) {
        return axios.post('http://localhost:8000/api/login', {
            email,
            password
        }).then(({ data }) => {
            window.localStorage.setItem('loginToken', data.token)
            window.localStorage.setItem('user', JSON.stringify(data.user))
            this.setAxiosDefaultAuthorizationHeader()
            return data.user;
        })
    }

    setAxiosDefaultAuthorizationHeader() {
        const TOKEN = window.localStorage.getItem('loginToken')
        axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`
    }

    logout() {
        window.localStorage.removeItem('loginToken')
        window.localStorage.removeItem('user')
        delete axios.defaults.headers.common['Authorization']
        console.log('logout')
    }

    isAuthenticated() {
        return !!window.localStorage.getItem('loginToken')
    }

    register(firstName, lastName, email, password) {
        this.user = {};
        this.user.firstName = firstName;
        this.user.lastName = lastName;
        this.user.email = email;
        this.user.password = password;
        return axios.post('http://localhost:8000/api/register', this.user)
            .then(() => {
                this.login(this.user.email, this.user.password);
            })
            .catch($e => {
                alert($e)
            })
    }
}

export const authService = new AuthService()