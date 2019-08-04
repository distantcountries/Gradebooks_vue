import axios from 'axios'

export default class ProfessorsService {
    constructor() {
        axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
    }

    getAll() {
        return axios.get('users')
    }

    get(id) {
        return axios.get('users/' + id)
    }

    add(newProfessor) {
        return axios.post('users', newProfessor)
    }
}

export const professorsService = new ProfessorsService()