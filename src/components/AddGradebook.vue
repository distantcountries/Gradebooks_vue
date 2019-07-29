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

</style>


