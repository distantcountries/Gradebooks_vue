<template>
    <div class="container">
        <h2 class="pageHeader">
            {{ professor.firstName }} {{ professor.lastName }}
        </h2>
        <div v-for="image in professor.images" :key="image.id" class="professorImages">
            <a href="#">
                <img :src="image.image" alt="Professor image" >
            </a>
        </div>
        <br>
        <div v-if="professor && professor.gradebook">
            <span class="professorName">
                <router-link :to="singleGradebook(professor.gradebook.id)">{{ professor.gradebook.name }}</router-link>
            </span>
            <br>
            Students in total: {{ studentsInTotal }}
        </div>
        <div v-else>
            There is not students
        </div>
    </div>
</template>

<script>
import { professorsService } from '../services/ProfessorsService'
export default {
    data() {
        return {
            professor:'',
        }
    },
    
    beforeRouteEnter (to, from, next) {
        next(vm => {
            professorsService.get(vm.$route.params.id)
                .then(response => {
                    vm.professor = response.data;
                }).
                catch(error => {
                    alert('Error with getting professor!');
                })
        })
    },

    methods: {
        singleGradebook(id) {
            return  `/gradebooks/${id}`;
        }
    }, 

    computed: {
        studentsInTotal() {
            return this.professor.gradebook.students.length
        }
    }
}
</script>

<style>
img {
    margin:0.5rem;
    height: 100px;
    width: auto;
    border-radius: 0.5rem;
    display: inline-block;
}

img:hover {
    opacity: 0.5;
    filter: alpha(opacity=40);
}
</style>
