<template>
    <div>
        Add student
    </div>
</template>

<script>
export default {

}
</script>

<style>

/* - naziv dnevnika
- ime razrednog starešine, 

forma učenika:
- button “Add new student” 
- input Ime učenika
- input Prezime učenika
- input dodaje slika Učenika 
    (validacija za slike je takođe identična kao u slučaju profesora)

- Click na add new student dodaju se dva (ili tri?) nova inputa (prakticno se duplira forma?)
    Moguće je dodati vise studenata odjednom, maximalan br. ograničiti na 35 
    (obratiti pažnju ukoliko je dnevnik imao prethodno dodate učenike, maximalan br. učenika po
    razredu je 35).

- “Submit”
    * Ako su podaci neispravni, dobijam validacione poruke
    * Ako su podaci ispravni, učenici su dodati i preusmeren sam na stranicu my-gradebook ili
        gradebooks/:id , u zavisnosti od koje sam stranice krenuo 
        (znaci vraca na back) */

</style>
