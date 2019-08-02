<template>
    <div class="container">
         <form @submit.prevent="addGradebook" class="addGradebookForm">
            <h3>Add Gradebook</h3>
            <input type="text" name="name" placeholder="Name..." v-model="newGradebook.name" class="form-control" pattern=".{2,255}" required title="Min 2 characters, max 255 characters" />
            <select v-model="newGradebook.user_id" class="form-control">
                <option value="" disabled selected>Choose professor...</option>
                <option v-for="(professor, index) in availableProfessors" :key="index" :value="professor.id" >
                    {{professor.firstName}} {{professor.lastName}}
                </option>
            </select>
            <button type="submit" class="btn btn-info">Submit</button>
            <button type="button" class="btn btn-info" @click="cancel">Cancel</button>
        </form>
    </div>
</template>

<script>
import { professorsService } from '../services/ProfessorsService'
import { gardebooksService } from '../services/GardebooksService'
export default {
    data() {
        return {
            newGradebook: {
                name:'', 
                user_id:'',
            },
            professors:[],
        }
    },

    created() {
        professorsService.getAll()
            .then(response => {
                this.professors = response.data
            })
    },

    methods: {
        getDefaults () {
            return {
                name: '',
                user_id:''
            }
        },

        addGradebook() { 
            gardebooksService.add(this.newGradebook)
                .then( response => {
                    this.newGradebook = this.getDefaults();
                    this.$router.push({ name: "gradebooks" });
                    }).catch(error => {
                        alert('Error with adding gradebook!');
                    });
        },

        cancel() {
            this.$router.push({ name: "gradebooks" });
        }
    }, 

    computed: {
        availableProfessors() {
            return this.professors.filter(professor => 
                professor.gradebook === null
            )
        }
    }
}
</script>

<style>
    /* forma dnevnika:

    +++- Naziv, obavezno polje, minimum 2 karaktera, maksimum 255
    +++- Select box za biranje Razrednog 
    +++        * U listi vidimo samo Profesore koji predhodno nisu razredne starešine, 
                (vučemo postojeće podatke iz baze)
    -+++ “Submit”
* Ako su podaci neispravni, dobijam validacione poruke.
            * Ako su podaci ispravni, dnevnik je dodat i preusmeren sam na stranicu “Gradebooks”.
    +++- dugme “Cancel” koje me preusmerava na “Gradebooks” */
    
.addGradebookForm {
    width:50%;
    margin: 0 auto;
    margin-top:1rem;
}

form input, form button {
    margin-bottom:0.5rem;
}

form button {
    margin-right: 1rem;
}

form select {
    margin-bottom: 0.5rem;
}

select:invalid { 
    color: gray; 
}
</style>


