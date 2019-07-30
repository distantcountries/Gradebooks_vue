<template>
    <div class="container">
        <h3>Gradebooks</h3>

        <ul>
            <li v-for="(gradebook, index) in gradebooks" :key="index">
                <router-link :to="singleGardebook(gradebook.id)">{{ gradebook.name }}</router-link>
                {{ gradebook.professor.firstName }}
                
            </li>
            <li v-if="gradebooks.length === 0">There is no created gradebooks</li>
        </ul>

    </div>
</template>

<script>
import { gardebooksService } from '../services/GardebooksService'
export default {
    data() {
        return {
            gradebooks:[], 
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
    }

}
</script>

<style>

/* lista poslednjh 10 dnevnika 

------dnevnik:
-naziv dnevnika -> link /gradebooks/:id, 
- ime i prezime razrednog starešine  -> link /teachers/:id
ukoliko dnevnik nema razrednog starešinu prikazujemo odgovarajucu poruku na datom mestu
- vreme kreiranja. 

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

