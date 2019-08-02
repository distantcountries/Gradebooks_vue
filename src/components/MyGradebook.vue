<template>
    <div class="container">
        <div class="pageHeader">
            <h3>{{professor.firstName}} {{professor.lastName}}</h3><hr>
        </div>
        <hr>

        <div v-if=" professor.gradebook">
            <span class="professorName">{{ professor.gradebook.name }}</span><br>
            <button class="btn btn-danger" @click="deleteGradebook" style="margin-right:0.5rem;">Delete gradebook</button>
            <button type="button" class="btn btn-warning" @click="addStudent">Add student</button><br><br>

            <span class="boldText">Students:</span>
            <ul>
                <div v-if="students">
                    <li v-for="(student, index) in students" :key="index">
                        {{ student.firstName }} {{ student.lastName }}
                    </li>
                    <li v-if="students.length === 0">This gradebook still doesn't have students.</li>
                </div>
            </ul>`

        </div>
        <div v-else>
            You dont' have a gradebook
        </div>

    </div>
</template>

<script>
import { professorsService } from '../services/ProfessorsService'
import { gardebooksService } from '../services/GardebooksService'
import { authService } from '../services/Auth'
export default {
    data() {
        return {
            user:JSON.parse(localStorage.getItem('user')), 
            professor:''
        }
    },

    created() {
        professorsService.get(this.user.id)
            .then(response => {
                this.professor = response.data   
                console.log(response.data)  
            })
    },

    methods: {
        addStudent() {
            this.$router.push({ name: "add-student" });
        },

        deleteGradebook() {
            if (window.confirm('Are you sure?')) {
                let id = this.$route.params.id
                gardebooksService.delete(id)
            }
            return  
        },
    },

    computed: {
        students() {
            return this.professor.gradebook.students
        }
    }
}
</script>

<style>
/* 
+++ Kada kao korisnik pristupim ovoj stranici, vidim 
+++- svoj dnevnik (na kome sam razredni starešina)
+++    * u koliko nisam dodeljen kao razredni starešina ni na jedan dnevnik prikazuje mi se samo 
+++   odgovarajuća poruka. 
+++- Vidim svoje ime i prezime
+++- liste učenika
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

+++Na My Gradebook ili na stranici pojedinačnog gradebook-a 
+++- dugme Delete gde mogu da obrisem dnevnik. 
+++- na click prvo iskače alert (window.confirm) kako bih potvrdio da li sam siguran. 
+++- Nakon potvrde dnevnik se briše iz baze i radi se redirekcija na Gradebooks stranicu. */ 


</style>
