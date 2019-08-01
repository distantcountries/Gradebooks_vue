<template>
     <div class="container">
        <div class="pageHeader">
            <h2>Professors</h2>
            <ProfessorSearch @searchTermUpdated="setSearchTerm" />
        </div>
        <hr>
        <ul>
            <li v-for="professor in filteredProfessors" :key="professor.id">
                <span class="professorName"><router-link :to="singleProfessor(professor.id)">{{ professor.firstName }} {{ professor.lastName }}</router-link></span><br>
                <div v-for="image in professor.images" :key="image.id" class="professorImages">
                    <a href="#"><img :src="image.image" alt="Professor image" ></a>
                </div>
                <br>
                <div v-if="professor && professor.gradebook">
                    {{ professor.gradebook.name }}
                </div>
                <div v-else>
                    <p>This professor is avilable</p>
                </div>
                <hr>
            </li>
        </ul>
    </div>
</template>

<script>
import { professorsService } from '../services/ProfessorsService'
import ProfessorSearch from './Search'
export default {
    components: {
        ProfessorSearch
    },

    data() {
        return {
            professors:[],
            name:''
        }
    },

    created() {
        professorsService.getAll()
            .then(response => {
                this.professors = response.data
            })
    },

    methods: {
        setSearchTerm(term) {
            this.name = term;
        },

        singleProfessor(id) {
            return  `teachers/${id}`;
        }
    },

    computed: {
        filteredProfessors() {
            return this.professors.filter(professor => {
                return professor.firstName.toLowerCase().includes(this.name.toLowerCase())
            })
        },

    }
}
</script>

<style>

/* 
+++- lista profesora:
+++- input da filtriram po imenu profesora 
+++- prikazati sliku profesora, 
+++- ime i prezime kao 
+++- naziv dnevnika 
        +++* ukoliko ima ulogu razrednog starešine, 
        +++* ukoliko nema prikazati umesto naziva dnevnika standardizovanu poruku 
                (npr. “Professor is available”)). */

.professorName a {
    font-size: 1.2rem;
    color: #eebd30;
}

.professorName a:hover {
    color: #494949;
    text-decoration: none;
}

h2 {
    width:70%;
}

.pageHeader {
    width: 100%;
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    align-content: center;
}

.container {
    padding: 3rem;
}

.professorImages {
    display: inline-block;
}

img {
    margin:0.5rem;
    height: 100px;
    width: auto;
    border-radius: 0.5rem;
    display: inline-block;
}
</style>
