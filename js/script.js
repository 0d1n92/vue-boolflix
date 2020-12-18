const api="https://api.themoviedb.org/3/search/movie"

var  app= new Vue({
  el: '#app',


  data: {
    title:'',
    films:[],
    img_url: "https://image.tmdb.org/t/p/w220_and_h330_face/",

  },
  methods: {
    search:function (array) {
      let self= this;
    if (self.title!="") {
      axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: "498c9ec3394d0a225e5b99e29b024805",
            query:self.title,
          }
        }
      ).then(
        (information) => {
         this.films= information.data.results;
      });
    }

    }
  },
  // mounted:function () {
  // //   axios.get('/user', {
  // //   params: {
  // //     ID: 12345
  // //   }
  // // })
  // // .then(function (response) {
  // //   console.log(response);
  // // })
  //
  // }
})
