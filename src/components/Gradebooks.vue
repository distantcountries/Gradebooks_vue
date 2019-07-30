<template>
    <div>
        Gradebooks
    </div>
</template>

<script>
export default {

}
</script>

<style>
/* lista poslednjh 10 dnevnika 

------dnevnik:
-naziv dnevnika -> link /gradebooks/:id, 
- ime i prezime razrednog starešine  -> link /teachers/:id
ukoliko dnevnik nema razrednog starešinu prikazujemo odgovarajucu poruku na datom mestu
- vreme kreiranja. 

U slučaju da nije kreiran nijedan dnevnik, prikazati odgovarajuću poruku. 

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

</style>

