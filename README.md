<h1>Boolfix</h1>
<p>Is an exercise in vue and axios. A replica of Netflix with api of themoviedb.org</p>
<h4>used technologies:</h4>
<ul>
  <li>html</p>
  <li>css</li>
  <li>Flexbox css</li>
  <li>js-6</li>
  <li>Vue</li>
  <li>Axios</li>
  <li>Ajax</li>
  <li>Api of themoviedb</li>
</ul>  
<h4>Track:</h4>  
<p>
In questo esercizio iniziamo a replicare la logica che sta dietro a tantissimi siti che permettono la visione di film e telefilm.
Per fare questo, come fanno siti molto più rinomati, utilizzeremo un API che ci permette di avere un insieme di risultati congrui alla nostra ricerca.

    • Iscriviamoci al sito https://www.themoviedb.org. E’ completamente gratuito.
    • Richiediamo la nostra API_KEY che verrà utilizzata in tutte le nostre chiamate. Servirà all’API a capire chi sta effettuando la chiamata.
    • Per richiederla clicchiamo sul nostro user, poi impostazioni, API e clicchiamo su “Richiedi una nuova API key”.
    • Una volta generato, in Impostazioni / API avremo la nostra chiave, indispensabile per tutte le nostre chiamate.

A questo url https://developers.themoviedb.org/3 troveremo tutte le chiamate possibili all’API. Possiamo giocarci in un secondo momento, ma come prima cosa concentriamoci su Search > Movies.
Con questa chiamata possiamo cercare tutti i film associati ad una ricerca (query). Passiamo come parametri query e api_key e vedremo i nostri risultati. Volendo possiamo passare anche language=it-IT per filtrare i risultati in lingua italiana.

Esempio chiamata:
https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d&query=ritorno+al+futuro

<stong>Milestone 1:</strong>
Ricreiamo una webapp, con layout simil-Netflix
    • Un header che contiene logo e search bar
    • Una main con i risultati che appaiono sotto forma di “card” in cui lo sfondo è rappresentato dall’immagine di copertina 342px (rettangolare)
    • Andando con il mouse sopra una card (on hover), appaiono le seguenti informazioni
        ◦ Titolo
        ◦ Titolo Originale
        ◦ Lingua
        ◦ Voto sotto forma di stelline colorate
        ◦ Descrizione (overview)

Il tutto deve essere creato in maniera statica, solo dopo passiamo a lavorare alla parte Vue.

Cliccando il  bottone, si devono cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Sostituiamo quindi le nostre schede con quelle generate dalla chiamata, tralasciando per ora le stelline.

<strong>Milestone 2:</strong>
Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
Qui un esempio di chiamata per le serie tv:
https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs
Milestone 3:
In questa milestone come prima cosa sostituiamo la copertina placeholder con quella vera del film o della serie al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo perché poi potremo generare da quella porzione di URL tante dimensioni diverse. Dovremo prendere quindi l’URL base delle immagini di TMDB: https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare (troviamo tutte le dimensioni possibili a questo link: https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400) per poi aggiungere la parte finale dell’URL passata dall’API.
Utilizziamo un’immagine placeholder quando non riceviamo una copertina dall’API.
Esempio di URL:
https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
<strong>Milestone 4 (Opzionale):</strong>
Partendo da un film o da una serie, richiedere all'API quali sono gli attori che fanno parte del cast aggiungendo alla nostra scheda Film / Serie SOLO i primi 5 restituiti dall’API con Nome e Cognome, e i generi associati al film con questo schema: “Genere 1, Genere 2, …”.

<strong>Milestone 5 (Opzionale):</strong>
Creare una lista di generi richiedendo quelli disponibili all'API e creare dei filtri con i generi tv e movie per mostrare/nascondere le schede ottenute con la ricerca.
</p>
