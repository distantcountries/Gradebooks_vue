<template>
    <div>
        <form class="form-inline mr-auto" @submit.prevent="handleSearch">
            <input class="form-control mr-sm-2" type="text" placeholder="Search gradebook" aria-label="Search" v-model="term" >
            <button type="submit" class="btn btn-secondary">Search</button>
        </form>
    </div>
</template>

<script>
export default {
    props:['gradebook'],

    data() {
        return {
            term:'',
        }
    },

    methods: {
        handleSearch() {
            this.$emit('searchTermUpdated', this.term)
        },
    }
}
</script>

<style>
form {
    width:100%;
}
</style>
