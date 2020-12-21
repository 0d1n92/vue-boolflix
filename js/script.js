// Milestone 3:
// In questa milestone come prima cosa sostituiamo la copertina placeholder con quella vera del film o della serie al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo perché poi potremo generare da quella porzione di URL tante dimensioni diverse. Dovremo prendere quindi l’URL base delle immagini di TMDB: https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare (troviamo tutte le dimensioni possibili a questo link: https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400) per poi aggiungere la parte finale dell’URL passata dall’API.
// Utilizziamo un’immagine placeholder quando non riceviamo una copertina dall’API.
// Esempio di URL:
// https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
//

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
      const apiKey="498c9ec3394d0a225e5b99e29b024805";
      // let apiFilms= axios.get('https://api.themoviedb.org/3/search/tv', {
      //   params: {
      //     api_key:apiKey,
      //     query: self.title,
      //     language:"it-IT",
      //   }
      // });
      //
      // let apiSeries= axios.get('https://api.themoviedb.org/3/search/tv', {
      //   params: {
      //     api_key:apiKey,
      //     query: self.title,
      //     language:"it-IT",
      //   }
      // });

      // Promise.all([axios.get(apiFilms),axios.get(apiSeries)]).then(function(values) {
      //   console.log(values);
      // });

      if (self.title!="" && self.title.length >= 3) {
        // Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
        Promise.all([
          axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
              api_key:apiKey,
              query: self.title,
              language:"it-IT",
            }
          }),
          axios.get('https://api.themoviedb.org/3/search/tv', {
            params: {
              api_key:apiKey,
              query: self.title,
              language:"it-IT",
            }
          })
        ])
        .then(
          function (information) {
            const informationMarge=[...information[0].data.results,...information[1].data.results,];
            setTimeout(function (){
            self.films= self.leanguagesFlag(informationMarge);
            self.films.forEach((item, i) => {
              if (self.films.length > 0 ) {
              item.vote_average=self.voteAverageRound(informationMarge[i].vote_average);
              }
            });
           },2000);
        });
      }
     },
     // Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
    voteAverageRound: function (vote) {
      // Math.Round(value * 2, MidpointRounding.AwayFromZero) / 2
      // voteRound=(Math.round(vote *2,  0.5) / 2)/2; for 0.5
      let voteRound=Math.ceil(vote/2);
      return voteRound;
    },
    leanguagesFlag: function (array) {

      array.forEach((item, i) => {
        if(item.original_language ==="en") {
          item.flag_img="uk-16.png";
        } else if (item.original_language ==="it") {
          item.flag_img="it-16.png";
        } else if (item.original_language ==="ja") {
          item.flag_img="jp-16.png";
        };

      });
        return array;
    }

  }
});
