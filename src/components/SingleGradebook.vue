<template>
    <div class="container">
        <h2 class="pageHeader">{{ gradebook.name }}</h2>
        <hr>

        <button class="btn btn-danger" @click="deleteGradebook">Delete gradebook</button>
         
        <div v-if="gradebook && gradebook.user">
           <span class="boldText">Professor:</span><router-link :to="singleProfessor(gradebook.user.id)" style="color:#eebd30; font-size:1.2rem;"> {{gradebook.user.firstName}} {{gradebook.user.lastName}}</router-link>
        </div>
        <div v-else>
            <p>This gradebook is waiting for professor</p>
        </div>

        <span class="boldText">Students:</span>
        <ul>
            <div v-if="students">
                <li v-for="(student, index) in students" :key="index">
                    {{ student.firstName }} {{ student.lastName }}
                </li>
                <li v-if="students.length === 0">This gradebook still doesn't have students.</li>
            </div>
        </ul>
        <button type="button" class="btn btn-warning" @click="addStudent">Add student</button><br><br>

        <hr>
        <div v-if="comments">
            <li v-for="(comment, index) in comments" :key="index" class="commentsList">
                {{ comment.content }}<br>
                <span style="font-style:italic;color:#727272;">
                    Posted by: 
                    {{ comment.user.firstName }} {{ comment.user.lastName }}, 
                    {{ comment.created_at }}
                    <hr>
                </span>
            </li>
        </div>

        <form @submit.prevent="addComment" class="addCommentForm">
            <textarea placeholder="Comment..." v-model="newComment.content" pattern=".{1,1000}" required title="Min 1 characters, max 1000 characters" class="form-control"></textarea>
            <div id="addCommentButton">
                <button type="submit" class="btn btn-info" style="margin-top:0.5rem;">Add comment</button>
            </div>
        </form>
    </div>
</template>

<script>
import { gardebooksService } from '../services/GardebooksService'
export default {
    data() {
        return {
            gradebook:'', 
            newComment:{
                content:''
            },
            id:null
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
        }, 

        comments() {
            return this.gradebook.comments
        }
    },

    methods: {
        addStudent() {
            this.$router.push({ name: "add-student" });
        },

        singleProfessor(id) {
            return  `/teachers/${id}`;
        },

        getDefaults () {
            return {
                content: '',
            }
        },

        addComment() {
            gardebooksService.addComment(this.newComment, this.id)
                .then( response => {
                    this.newComment = this.getDefaults();
                }).catch(error => {
                        alert('Error with adding comment!');
                });
        },

        deleteGradebook() {
            if (window.confirm('Are you sure?')) {
                let id = this.$route.params.id
                gardebooksService.delete(id)
            }
            return  
        }
    },

    created(){
       this.id = this.$router.currentRoute.params.id;
    },
}
</script>

<style>
/* 
    - indentičan prikaz dnevnika  kao na my-gradebook stranici. 
        +++- dnevnik ..naziv
        +++- ime i prezime razrednog staresine
        +++- liste učenika
        +++- Ukoliko nema dodeljenog ni jednog učenika prikazujemo odgovarajucu poruku. 
        +++- dugme “Add New Students” - U gornjem levom uglu. Klikom otvara se stranica za dodavanje učenika 
            link -> ‘/gradebooks/:id/students/create’
        - samo ulogovani korisnik moze da dodaje studente
            
    +++Lista komentara:
    +++Commentar:
        +++- ime autora
        +++- vreme postavljanja
        +++- content komentara

    Ako sam ulogovan korisnik, ispod liste komentara:
    forma comments:
    +++- textarea gde upisujem komentar; maksimalno 1000 karaktera i min:1 karakter
    
    Nakon uspešnog dodavanja, komentar je automatski dodat u listu komentara iznad, forma za
    dodavanej komentara se ne vidi. 

    Ako sam ulogovan korisnik, pored svakog mog komentara imam button “Delete” za brisanje komentara. 
    Na klik, aplikacija me najpre pita za potvrdu (window.confirm) da li sam siguran da želim da obrišem komentar. 
    Nakon što potvrdim, komentar treba da je automatski izbrisan iz liste komentara.
    
    Neulogovani korisnici mogu samo da vide comments dok ne mogu da ih dodaju, brisu ili edituju. 
    Forma se ni ne vidi ako nismo ulogovani. 
    Delete comments se ne vidi ako nismo ulogovani. */

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

.boldText {
    font-weight: bold;
}

.commentsList {
    margin-bottom: 1rem;
}

.addCommentForm {
    width: 100%;
}

#addCommentButton {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

</style>
