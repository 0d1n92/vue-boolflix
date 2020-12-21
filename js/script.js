//Milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
// Qui un esempio di chiamata per le serie tv:
// https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs
var  app= new Vue({
  el: '#app',


  data: {
    title:'',
    films:[],
    img_url: "https://image.tmdb.org/t/p/w220_and_h330_face/",
    vote:[],


  },
  methods: {
    search:function (array) {
      let self= this;
      if (self.title!="" && self.title.length >= 3) {
        axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
              api_key: "498c9ec3394d0a225e5b99e29b024805",
              query:self.title,
              language: "it-IT",

            }
          }
        ).then(
          (information) => {
            let movieData=information.data.results;
           setTimeout(function (){self.films= movieData
            self.films.forEach((item, i) => {
              if (self.films.length > 0 ) {
              item.vote_average=self.voteAverageRound(movieData[i].vote_average);
              }
            });


           },2000);


           // self.films[self.indexMovie].vote_average=self.voteAverageRound(movieData[self.indexMovie].vote_average);
        });
      }
    },
    voteAverageRound: function (vote) {
      // Math.Round(value * 2, MidpointRounding.AwayFromZero) / 2
      // voteRound=(Math.round(vote *2,  0.5) / 2)/2; for 0.5
      let voteRound=Math.ceil(vote/2);
      return voteRound;
    }
  }
});
