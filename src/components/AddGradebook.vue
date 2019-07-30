<template>
    <div>
         <form @submit.prevent="login">
            <h3>Add Gradebook</h3>
            <input type="text" name="name" placeholder="Name..." v-model="name" class="form-control" pattern=".{2,255}" required title="Min 2 characters, max 255 characters" />
            <select >
                <option></option>
            </select>
            
            <button type="submit" class="btn btn-info">Submit</button>
            <button type="button" class="btn btn-info" @click="gradebooks">Cancel</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name:'',

        }
    },

    methods: {
        gradebooks() {
            this.$router.push({ name: "gradebooks" });
        }
    }
}
</script>

<style>
    /* forma dnevnika:
    - Naziv, obavezno polje, minimum 2 karaktera, maksimum 255
    - Select box za biranje Razrednog 
            * U listi vidimo samo Profesore koji predhodno nisu razredne starešine, 
                (vučemo postojeće podatke iz baze)
    - “Submit”
            * Ako su podaci neispravni, dobijam validacione poruke.
            * Ako su podaci ispravni, dnevnik je dodat i preusmeren sam na stranicu “Gradebooks”.
    - dugme “Cancel” koje me preusmerava na “Gradebooks” */

</style>


