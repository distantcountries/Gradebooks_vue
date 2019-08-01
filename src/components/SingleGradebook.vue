<template>
    <div class="container">
        <h2 class="pageHeader">{{ gradebook.name }}</h2>
        <hr>
        Professor: {{user}}<br>

        Students:
        <ul>
            <li v-for="(student, index) in students" :key="index">
                {{ student.firstName }}
            </li>
            <!-- <li>This gradebook still doesn't have students.</li> -->
        </ul>
    </div>
</template>

<script>
import { gardebooksService } from '../services/GardebooksService'
export default {
    data() {
        return {
            gradebook:'', 

        }
    },

    beforeRouteEnter (to, from, next) {
        next(vm => {
            gardebooksService.get(vm.$route.params.id)
                .then(response => {
                    vm.gradebook = response.data;
                }).
                catch(error => {
                    alert(error);
                })
        })
    },

    computed: {
        students() {
            return this.gradebook.students
        }, 

        user() {
            return this.gradebook.user.firstName
        }
    }


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


/* 
    - indentičan prikaz dnevnika  kao na my-gradebook stranici. 
        +++- dnevnik ..naziv
        - ime i prezime razrednog staresine
        +++- liste učenika
        - Ukoliko nema dodeljenog ni jednog učenika prikazujemo odgovarajucu poruku. 
        - dugme “Add New Students” - U gornjem levom uglu. Klikom otvara se stranica za dodavanje učenika 
            link -> ‘/gradebooks/:id/students/create’
            
    Lista komentara:
    Commentar:
        - ime autora
        - vreme postavljanja
        - content komentara

    Ako sam ulogovan korisnik, ispod liste komentara:
    forma comments:
    - textarea gde upisujem komentar; maksimalno 1000 karaktera i min:1 karakter
    
    Nakon uspešnog dodavanja, komentar je automatski dodat u listu komentara iznad, forma za
    dodavanej komentara se ne vidi. 

    Ako sam ulogovan korisnik, pored svakog mog komentara imam button “Delete” za brisanje komentara. 
    Na klik, aplikacija me najpre pita za potvrdu (window.confirm) da li sam siguran da želim da obrišem komentar. 
    Nakon što potvrdim, komentar treba da je automatski izbrisan iz liste komentara.
    
    Neulogovani korisnici mogu samo da vide comments dok ne mogu da ih dodaju, brisu ili edituju. 
    Forma se ni ne vidi ako nismo ulogovani. 
    Delete comments se ne vidi ako nismo ulogovani. */


</style>
