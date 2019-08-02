<template>
    <div class="container">
        <div class="pageHeader">
            <h2>My name</h2>
            <div v-for="(professor, index) in professors" :key="index">
                <!-- <p v-if="isAuthenticate && auth " >{{ professor.firstName }}</p> -->
            </div>


        </div>
        <hr>
    </div>
</template>

<script>
import { professorsService } from '../services/ProfessorsService'
import { authService } from '../services/Auth'
export default {
     props : ['user'],
    data() {
        return {
            email:'',
            professors:[], 
            isAuthenticated: authService.isAuthenticated() 
        }
    },

    created() {
        professorsService.getAll()
            .then(response => {
                this.professors = response.data     
                console.log(this.isAuthenticated) 
            })
    },



}
</script>

<style>
/* 
Kada kao korisnik pristupim ovoj stranici, vidim 
- svoj dnevnik (na kome sam razredni starešina)
    * u koliko nisam dodeljen kao razredni starešina ni na jedan dnevnik prikazuje mi se samo 
    odgovarajuća poruka. 
- Vidim svoje ime i prezime
- liste učenika
    * Ukoliko nemam dodeljenog ni jednog učenika prikazujemo odgovarajucu poruku. 
- dugme “Add New Students” - U gornjem levom uglu. Klikom otvara se stranica za dodavanje učenika 
    link -> ‘/gradebooks/:id/students/create’

------- 

- dugme “Edit” link-> /gradebooks/:id/edit 
- prikazuje ista forma kao za dodavanje dnevnika (add-gradebook) 
    sa dodatkom liste ucenika (koji su predhodno dodati) i imam iste opcije kao i tamo. 
    (ovde mogu da editujem, kao i da dodajem ili sklanjam učenike iz liste 
    (voditi računa da je takođe max broj ucenika 35)). 
    Nakon uspešne izmene, preusmeren sam opet na My
    Gragebook stranicu ili stanicu pojedinacnog dnevnika ,gde vidim izmenjene podatke.

- Pored dugmeta “Submit” imam i 
- dugme “Cancel” koje me preusmerava takođe na MyGradebook stranicu. 

--------------

Na My Gradebook ili na stranici pojedinačnog gradebook-a 
- dugme Delete gde mogu da obrisem dnevnik. 
- na click prvo iskače alert (window.confirm) kako bih potvrdio da li sam siguran. 
- Nakon potvrde dnevnik se briše iz baze i radi se redirekcija na Gradebooks stranicu. */ 


</style>
