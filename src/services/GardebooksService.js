import axios from 'axios'

export default class GardebooksService {
    constructor() {
        axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
    }

    getAll() {
        return axios.get('gradebooks')
    }

    get(id) {
        return axios.get('gradebooks/' + id)
    }


}

export const gardebooksService = new GardebooksService()