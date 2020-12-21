//Milestone 2:

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
           setTimeout(function (){
            self.films= self.leanguagesFlag(movieData);

                console.log(self.films[1].flag_img);
            self.films.forEach((item, i) => {
              if (self.films.length > 0 ) {
              item.vote_average=self.voteAverageRound(movieData[i].vote_average);
              }
            });

           },2000);
        });
      }
    },
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
