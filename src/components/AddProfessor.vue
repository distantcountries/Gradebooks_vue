<template>
    <div class="container">
        <form @submit.prevent="addProfessor" class="addProfessorForm">
            <h3>Add professor</h3><hr>
            <input type="text" name="firstName" placeholder="First name..." v-model="newProfessor.firstName" class="form-control" pattern=".{1,255}" required title="Max 255 characters" />
            <input type="text" name="lastName" placeholder="Last name..." v-model="newProfessor.lastName" class="form-control" pattern=".{1,255}" required title="Max 255 characters" />
            
            <select v-model="newProfessor.gradebook_id" class="form-control">
                <option value="" disabled selected>Choose gradebook...</option>
                <option v-for="(gradebook, index) in availableGradebooks" :key="index" :value="gradebook.id" >
                    {{gradebook.name}}
                </option>
            </select>
            
            <div>
                <button @click="showImageInput = true" class="btn btn-secondary" >Add Image</button>
                <input v-if="showImageInput" type="file" accept=".png, .jpg, .jpeg" required />
            </div>
            <hr>
            <div id="addProfessorsButtons">
                <button type="submit" class="btn btn-info">Submit</button>
                <button type="button" class="btn btn-info" @click="goToProfessors">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script>
import { gardebooksService } from '../services/GardebooksService'
import { professorsService } from '../services/ProfessorsService'
export default {
    data() {
        return {
            newProfessor: {
                firstName:'',
                lastName:'',
                showImageInput: false, 
                gradebook:''
            },

            gradebooks:[]
        }
    },

    methods: {
        getDefaults () {
            return {
                firstName:'',
                lastName:'',
                showImageInput: false, 
                gradebook:''
            }
        },

        addProfessor() {
             professorsService.add(this.newProfessor)
                .then( response => {
                    this.newProfessor = this.getDefaults();
                    this.$router.push({ name: "all-professors" });
                    }).catch(error => {
                        alert('Error with adding professor!');
                    });
        }, 

        goToProfessors() {
            this.$router.push({ name: "all-professors" });
        }
    }, 

    created() {
        gardebooksService.getAll()
            .then(response => {
                this.gradebooks = response.data
            })
    },

    computed: {
        availableGradebooks() {
            return this.gradebooks.filter(gradebook => 
                gradebook.user_id === null
            )
        }
    }
}
</script>

<style>
/* 
forma profesora:
+++- firstName -> required, max 255
+++- lastName -> required, max 255
- select box koji prikazuje sve dnevnike koji nemaju dodeljenog razrednog starešinu 
    (ovo polje moze da bude nullable, i nije potrebno dodati dnevnik da bi se kreirao profesor)
- input za dodavanje slike profesora -> required
    * Imam mogućnost da dodajem proizvoljan broj URL-ova preko dugmeta “Add Image”
    * Za svaki URL postavljamo posebno input polje
    * Validiramo da li je upisan validan URL i da li se URL završava sa nekom image
        ekstenzijom (png, jpg ili jpeg)
    * Imam mogućnost da uklonim bilo koji URL
    * defaultno se ne prikazuje nijedan input za dodavanje slika. Ukoliko user ne doda sliku, 
        i pokusa da submituje vraća mu se validaciona poruka i ispisuje se da je neophodno dodati 
        bar jednu sliku 
    * click-om na dugme add Image kreira se input ispod Title inputa
- “Submit”, ako su podaci neispravni, dobijam validacione poruke. Ako su podaci ispravni preusmerenje  
    na stranicu “All Professors”.
+++- dugme “Cancel” koje me preusmerava na “All Professors” */

.addProfessorForm {
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

#addProfessorsButtons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

</style>





