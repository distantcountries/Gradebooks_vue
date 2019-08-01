<template>
    <div>
        <form @submit.prevent="addProfessor" class="addProfessorForm">
            <h3>Add student</h3>

            <div v-for="form in forms">
                <input type="text" name="firstName" placeholder="First name..." v-model="firstName" class="form-control" pattern=".{1,255}" required title="Max 255 characters" />
                <input type="text" name="lastName" placeholder="Last name..." v-model="lastName" class="form-control" pattern=".{1,255}" required title="Max 255 characters" />
                <div>
                    <button @click="showImageInput = true" class="btn btn-secondary" >Add Image</button>
                    <input v-if="showImageInput" type="file" accept=".png, .jpg, .jpeg" required />
                </div>
            </div>

            <button type="submit" class="btn btn-info" @click="callFormAgain">Add more students</button>
            <br>
            <button type="submit" class="btn btn-info">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstName:'',
            lastName:'',
            gradebook:'', 
            showImageInput: false, 
            forms:[1], 
            counter:''
        }
    },

    methods:{
        addProfessor() {

        },

        callFormAgain() {
            this.forms.push(this.counter++)
        }
    }, 

    computed: {
        formsDuplicate() {
            return this.forms
        }
    }

}
</script>

<style>

/* - naziv dnevnika
- ime razrednog starešine, 

forma učenika:
- button “Add new student” 
+++- input Ime učenika
+++- input Prezime učenika
- input dodaje slika Učenika 
    (validacija za slike je takođe identična kao u slučaju profesora)

- Click na add new student dodaju se dva (ili tri?) nova inputa (prakticno se duplira forma?)
    Moguće je dodati vise studenata odjednom, maximalan br. ograničiti na 35 
    (obratiti pažnju ukoliko je dnevnik imao prethodno dodate učenike, maximalan br. učenika po
    razredu je 35).

- “Submit”
    * Ako su podaci neispravni, dobijam validacione poruke
    * Ako su podaci ispravni, učenici su dodati i preusmeren sam na stranicu my-gradebook ili
        gradebooks/:id , u zavisnosti od koje sam stranice krenuo 
        (znaci vraca na back) */

</style>
