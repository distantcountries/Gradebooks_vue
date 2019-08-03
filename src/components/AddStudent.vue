<template>
    <div class="container">
        <form @submit.prevent="addProfessor" class="addProfessorForm">
        <div class="titleAndButton">
            <h3>
                Add student
            </h3>
            <button type="button" class="btn btn-warning" @click="callFormAgain">Add more students</button>
            <hr>
        </div>
            <div v-for="(form, index) in forms" :key="index">
                <input 
                    type="text" 
                    name="firstName" 
                    placeholder="First name..." 
                    v-model="firstName" 
                    class="form-control" 
                />
                <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Last name..." 
                    v-model="lastName" 
                    class="form-control" 
                />
                <div>
                    <button @click="showImageInput = true" class="btn btn-secondary" >Add Image</button>
                    <input v-if="showImageInput" type="file" accept=".png, .jpg, .jpeg" required />
                </div><hr>
            </div>
            <div id="submitStudent">
                <button type="submit" class="btn btn-info" >Submit</button>
            </div>
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
        callFormAgain() {
            this.forms.push(this.counter++)
        }
    }, 
}
</script>

<style>
.titleAndButton {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
}

.titleAndButton h3 {
    width: 68%;
}

#submitStudent {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
