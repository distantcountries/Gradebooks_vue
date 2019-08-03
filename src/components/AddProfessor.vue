<template>
    <div class="container">
        <form @submit.prevent="addProfessor" class="addProfessorForm">
            <h3>Add professor</h3><hr>
            <input 
                type="text" 
                name="firstName" 
                placeholder="First name..." 
                v-model="newProfessor.firstName" 
                class="form-control" 
                pattern=".{1,255}" 
                required 
                title="Max 255 characters" 
            />
            <input 
                type="text" 
                name="lastName" 
                placeholder="Last name..." 
                v-model="newProfessor.lastName" 
                class="form-control" 
                pattern=".{1,255}" 
                required 
                title="Max 255 characters" 
            />           
            <select v-model="newProfessor.gradebook" class="form-control">
                <option value="" disabled selected>
                    Choose gradebook...
                </option>
                <option v-for="(gradebook, index) in availableGradebooks" :key="index" :value="gradebook.id" >
                    {{gradebook.name}}
                </option>
            </select> 
            <button @click="showImageInput" class="btn btn-secondary" >Add Image</button>
            <div v-for="(image, index) in newProfessor.images" :key="index">
                <input v-if="imageInput" type="file" accept=".png, .jpg, .jpeg" required  />
                <button type="button" @click="removeImage(index)" >x</button>
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
                gradebook:'', 
                images:[]
            },
            gradebooks:[],
            imageInput: false, 
        }
    },

    methods: {
        getDefaults () {
            return {
                firstName:'',
                lastName:'',
                showImageInput: false, 
                counter:'',
                gradebook:''
            }
        },

        addProfessor() {
            professorsService.add(this.newProfessor)
                .then( response => {
                    this.newProfessor = this.getDefaults();
                    this.$router.push({ name: "all-professors" });
                })
        }, 

        showImageInput() {
            this.imageInput = true
            this.newProfessor.images.push(this.counter++)
        },

        removeImage(index) {
            return this.newProfessor.images.splice(index, 1);
        },

        goToProfessors() {
            this.$router.push({ name: "all-professors" });
        },
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





