<template>
    <div class="container">
        <div class="pageHeader">
            <h3>{{professor.firstName}} {{professor.lastName}}</h3>
            <hr>
        </div>
        <hr>
        <div v-if=" professor.gradebook">
            <span class="professorName">{{ professor.gradebook.name }}</span><br>
            <button class="btn btn-danger" @click="deleteGradebook" style="margin-right:0.5rem;">Delete gradebook</button>
            <button type="button" class="btn btn-warning" @click="addStudent">Add student</button><br><br>
            <span class="boldText">Students:</span>
            <ul>
                <div v-if="students">
                    <li v-for="(student, index) in students" :key="index">
                        {{ student.firstName }} {{ student.lastName }}
                    </li>
                    <li v-if="students.length === 0">
                        This gradebook still doesn't have students.
                    </li>
                </div>
            </ul>
        </div>
        <div v-else>
            You dont' have a gradebook
        </div>
    </div>
</template>

<script>
import { professorsService } from '../services/ProfessorsService'
import { gardebooksService } from '../services/GardebooksService'
import { authService } from '../services/Auth'
export default {
    data() {
        return {
            user:JSON.parse(localStorage.getItem('user')), 
            professor:''
        }
    },

    created() {
        professorsService.get(this.user.id)
            .then(response => {
                this.professor = response.data   
            })
            .catch(error => {
                alert('Error with getting professor!');
            })
    },

    methods: {
        addStudent() {
            this.$router.push({ name: "add-student" });
        },

        deleteGradebook() {
            if ( window.confirm('Are you sure you want to delete your gradebook?') ) {
                let id = this.$route.params.id
                gardebooksService.delete(id)
                this.$router.push({ name: "gradebooks" });
            }
            return  
        },
    },

    computed: {
        students() {
            return this.professor.gradebook.students
        }
    }
}
</script>

<style>

</style>
