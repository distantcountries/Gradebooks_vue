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

    add(newGradebook) {
        return axios.post('gradebooks', newGradebook)
    }

    addComment(newComment, id) {
        console.log(JSON.parse(localStorage.getItem('user')));
        return axios.post('comments/', { comment: newComment, gradebook_id:id, user_id: JSON.parse(localStorage.getItem('user')).id })
    }

    edit(myProfile) {
        return axios.put('gradebooks', myProfile)
    }

    delete(id){
        return axios.delete(`/gradebooks/${id}`)
    }
}

export const gardebooksService = new GardebooksService()