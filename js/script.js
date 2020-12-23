
// Milestone 4 (Opzionale):
// Partendo da un film o da una serie, richiedere all'API quali sono gli attori che fanno parte del cast aggiungendo alla nostra scheda Film / Serie SOLO i primi 5 restituiti dall’API con Nome e Cognome, e i generi associati al film con questo schema: “Genere 1, Genere 2, …”.


// Qui un esempio di chiamata per le serie tv:
// https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs
var  app= new Vue({
  el: '#app',


  data: {
    titleSearch:'',
    id:'',
    films:[],
    img_url: "https://image.tmdb.org/t/p/w342/",
  },
  methods: {
    search:function (array) {
      let self= this;
      const apiKey="498c9ec3394d0a225e5b99e29b024805";
      let apiFilms="https://api.themoviedb.org/3/movie/"+self.id+"/credits"
      // let apiFilms= axios.get('https://api.themoviedb.org/3/search/tv', {
      //   params: {
      //     api_key:apiKey,
      //     query: self.titleSearch,
      //     language:"it-IT",
      //   }
      // });
      //
      // let apiSeries= axios.get('https://api.themoviedb.org/3/search/tv', {
      //   params: {
      //     api_key:apiKey,
      //     query: self.titleSearch,
      //     language:"it-IT",
      //   }
      // });

      // Promise.all([axios.get(apiFilms),axios.get(apiSeries)]).then(function(values) {
      //   console.log(values);
      // });
      if (self.titleSearch!="" && self.titleSearch.length >= 3) {
        // Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
        Promise.all([
          axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
              api_key:apiKey,
              query: self.titleSearch,
              language:"it-IT",
            }
          }),
          axios.get('https://api.themoviedb.org/3/search/tv', {
            params: {
              api_key:apiKey,
              query: self.titleSearch,
              language:"it-IT",
            }
          }),
          axios.get('https://api.themoviedb.org/3/genre/movie/list', {
            params: {
              api_key:apiKey,
              language:"it-IT",
            }
          }),
          // axios.get(apiFilms, {
          //    params: {
          //      api_key:apiKey,
          //      language:"it-IT",
          //    }
          // })
        ])
        .then(
          function (information) {

              setTimeout(function (){
              const informationMarge=[...information[0].data.results,...information[1].data.results,];
              self.films= self.leanguagesFlag(informationMarge);

              self.films.forEach((item, i) => {
                if (self.films.length > 0 ) {
                  self.findGenre(item, information[2].data.genres);
                

                  // console.log(self.id);
                  // console.log(apiFilms);
                  // if (i<=4){
                  //   item.cast=information[2].data.cast;
                  // }
                  console.log(item.cast)
                  item.vote_average=self.voteAverageRound(informationMarge[i].vote_average);

                }
              });
            },4000);
        });
      } else {
        self.films=[];
      }
     },
     // Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
    voteAverageRound: function (vote) {
      // Math.Round(value * 2, MidpointRounding.AwayFromZero) / 2
      // voteRound=(Math.round(vote *2,  0.5) / 2)/2; for 0.5
      let voteRound=Math.ceil(vote/2);
      return voteRound;
    },

    findGenre: function (element, arrayId) {
      arrayId.forEach((item, i) => {
        if(item.id==element.genre_ids){
          element.genre=item.name;
        }

      });
      return element;
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
