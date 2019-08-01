<template>
    <div class="container">
        <h2 class="pageHeader">{{ professor.firstName}} {{ professor.lastName}}</h2>
        <div v-for="image in professor.images" :key="image.id" class="professorImages">
            <a href="#"><img :src="image.image" alt="Professor image" ></a>
        </div><br>
        <span class="professorName"><router-link :to="singleGradebook(professor.gradebook.id)">{{ professor.gradebook.name }}</router-link></span>
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
                    alert(error);
                })
        })
    },

    methods: {
        singleGradebook(id) {
            return  `/gradebooks/${id}`;
        }
    }
}
</script>

<style>
/* 
Podaci o profesoru:
+++- ime i prezime
+++- slika profesora
- ime dnevnika na kome je razredni starešina -> link gradebooks/:id
- ako je razredni br. učenika koji je u tom razredu */



</style>
