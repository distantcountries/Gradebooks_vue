<template>
    <div class="container">
        <div class="pageHeader">
            <h2>Gradebooks</h2>
            <GradebookSearch @searchTermUpdated="setSearchTerm" />
        </div>
        <hr>
        <ul>
            <li v-for="(gradebook, index) in visibleGradebooks" :key="index">
                <span class="linkTittle">
                    <router-link :to="singleGardebook(gradebook.id)">
                        {{ gradebook.name }}
                    </router-link>
                </span>
                <br>
                <span class="linkElement" v-if="gradebook.user_id===null" style="color:#727272;">
                    This gradebook still doesn't have a professor
                </span>
                <span class="linkElement" v-else>
                    <router-link :to="mainProfessor(gradebook.user.id)">Professor {{ gradebook.user.firstName }} {{ gradebook.user.lastName }}</router-link>
                </span>
                <br>
                <span class="timeElement">Created at: {{ gradebook.created_at }}</span>
                <hr>
            </li>
            <li v-if="gradebooks.length === 0">
                There is no created gradebooks
            </li>
        </ul>
        <div v-if="gradebooks.length/10>counter && gradebooks.length>0 " style="padding-left:50%;">
            <button @click="encreaseShownGradebooks" type="button" class="btn btn-warning">Load more</button>
        </div>
    </div>
</template>

<script>
import { gardebooksService } from '../services/GardebooksService'
import GradebookSearch from './Search'
export default {
    components: {
        GradebookSearch
    },

    data() {
        return {
            gradebooks:[], 
            currentPage:1, 
            shownGradebooks:10, 
            counter:1, 
            term:''
        }
    }, 
    
    created() {
        gardebooksService.getAll()
            .then(response => {
                this.gradebooks = response.data
            })
            .catch(error => {
                alert('Error with getting gradebooks!');
            });
    },

    methods: {
        singleGardebook(id) {
            return  `gradebooks/${id}`;
        },

        mainProfessor(id) {
            return  `teachers/${id}`;
        },

        loadMore() {
            return this.visibleGradebooks++
        }, 

        encreaseShownGradebooks() {
            this.shownGradebooks+=10
            ++this.counter
        }, 
        
        setSearchTerm(term) {
            this.term = term;
            this.visibleGradebooks
        },
    },

    computed: {
        reversedGradebooks() {
            return this.gradebooks.filter(gradebook => {
                return gradebook.name.toLowerCase().includes(this.term.toLowerCase())
            }).reverse()
        },

        visibleGradebooks() {
            let bottomLimit = (this.currentPage - 1) * this.shownGradebooks;
            let topLimit = bottomLimit + this.shownGradebooks;
            return this.reversedGradebooks.filter((reversedGradebooks, index) => {
                return index >= bottomLimit && index < topLimit;
            })
        }, 
    },
}
</script>

<style>
.linkTittle a {
    font-size: 1.5rem;
    color: #eebd30;
    font-weight: bold;
}

.linkTittle a:hover, .linkElement a:hover {
    color:#9F9F9F;
    text-decoration: none;
}

.linkElement a {
    color:#494949;
    font-size: 1.2rem;
    font-weight: bold;
}

.timeElement {
    color: #727272;
    font-style: italic;
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
</style>

