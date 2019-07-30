<template>
    <div class="container">
        <h3>Gradebooks</h3><hr>

        <ul>
            <li v-for="(gradebook, index) in visibleGradebooks" :key="index">
                <span class="linkTittle"><router-link :to="singleGardebook(gradebook.id)">{{ gradebook.name }}</router-link></span><br>
                <span class="linkElement" v-if="gradebook.professor.id===null">This gradebook still doesn't have a professor</span>
                <span class="linkElement" v-else><router-link :to="mainProfessor(gradebook.professor.id)">Professor {{ gradebook.professor.firstName }} {{ gradebook.professor.lastName }}</router-link></span><br>
                <span class="timeElement">Created at: {{ gradebook.created_at }}</span>
                <hr>
            </li>
            <li v-if="gradebooks.length === 0">There is no created gradebooks</li>
        </ul>
        <button @click="encreaseShownGradebooks">Load more</button>
    </div>
</template>

<script>
import { gardebooksService } from '../services/GardebooksService'
import Pagination from './Pagination'
export default {
    components: {
        Pagination
    },

    data() {
        return {
            gradebooks:[], 
            currentPage:1, 
            shownGradebooks:10
        }
    }, 
    
    created() {
        gardebooksService.getAll()
            .then(response => {
                this.gradebooks = response.data
            })
            .catch(() => {
                console.log('Error!')
            })
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
        }
    },

    computed: {
        numberOfPages() {
            return Math.ceil(this.gradebooks.length / this.shownGradebooks);
        },

        visibleGradebooks() {
            let bottomLimit = (this.currentPage - 1) * this.shownGradebooks;
            let topLimit = bottomLimit + this.shownGradebooks;
            return this.gradebooks.filter((gradebooks, index) => {
                return index >= bottomLimit && index < topLimit;
            })
        }
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

h3 {
    font-weight: bold;
}


/* lista poslednjh 10 dnevnika 

------dnevnik:
+++-naziv dnevnika -> link /gradebooks/:id, 
+++- ime i prezime razrednog starešine  -> link /teachers/:id
ukoliko dnevnik nema razrednog starešinu prikazujemo odgovarajucu poruku na datom mestu
+++- vreme kreiranja. 

+++U slučaju da nije kreiran nijedan dnevnik, prikazati odgovarajuću poruku. 

------“load more” , na dnu stranice:
- da učitam dodatnih 10 dnevnika
- Ako nema više dnevnika za učitavanje, ovaj button se ne prikazuje.

-------input polje i dugme “Filtriraj”, na vrhu stranice:
- da filtriram dnevnike
- kada ukucam termin i kliknem na dugme prikazuju mi se samo
dnevnici koji imaju ukucan termin u imenu dnevnika 
(podrazumeva se partial term kao i case insensitive). 

“load more” se i dalje prikazuje i klikom na “load more” dugme se učitava novih 10
dnevnika koji zadovoljavaju kriterijume filtera. */

.container {
    padding: 3rem;
}
</style>

