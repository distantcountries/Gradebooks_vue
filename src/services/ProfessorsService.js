import axios from 'axios'

export default class ProfessorsService {
    constructor() {
        axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
    }

    getAll() {
        return axios.get('professors')
    }

    get(id) {
        return axios.get('professors/' + id)
    }


}

export const professorsService = new ProfessorsService()