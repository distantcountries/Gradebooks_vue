<template>
    <div>
         <form @submit.prevent="addProfessor">
            <h3>Add professor</h3>
            <input type="text" name="firstName" placeholder="First name..." v-model="firstName" class="form-control" pattern=".{1,255}" required title="Max 255 characters" />
            <input type="text" name="lastName" placeholder="Last name..." v-model="lastName" class="form-control" pattern=".{1,255}" required title="Max 255 characters" />
            <!-- <select>
                <option></option>
            </select> -->
            <div>
                <button @click="showImageInput = true" class="btn btn-secondary" >Add Image</button>
                <input v-if="showImageInput" type="file" accept=".png, .jpg, .jpeg" required />
            </div>

            <button type="submit" class="btn btn-info">Submit</button>
            <button type="button" class="btn btn-info" @click="allProfessors">Cancel</button>

        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstName:'',
            lastName:'',
            showImageInput: false
        }
    },

    methods: {
        addProfessor() {

        }, 

        allProfessors() {
            this.$router.push({ name: "all-professors" });
        }
    }
}
</script>

<style>
form button {
    margin-right: 1rem;
}


</style>





