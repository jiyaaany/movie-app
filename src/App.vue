<template>
<section class="wrapper">
  <div id="app" class="movies">
    <template v-if="!is_loading">
      <Movie v-for="(movie, index) in movies" :key="index" :movie-info="movie"></Movie>
    </template>
    <template v-else>
      <div class="loader">
        <i class="xi-spinner-2 xi-3x xi-spin"></i>
      </div>
    </template>
  </div>
  </section>
</template>

<script>
import axios from "axios"
import moment from "moment"
import Movie from "./components/Movie"

export default {
  name: 'App',

  data: () => ({
    movies: [],
    is_loading: true
  }),

  created() {
    const KOBIS_BOX_OFFICE_URI = '//www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';
    const KOBIS_MOVIE_URI = '//www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json';
    const TMDB_POSTER_URI = '//image.tmdb.org/t/p/w185_and_h278_bestv2';
    const TMDB_SEARCH_URI = '//api.themoviedb.org/3/search/movie';
    const KOBIS_KEY = 'd47861bb48249ec71d4bf89609e340b5';
    const TMDB_KEY = '426d65cfa3cf702b8ab8816512b9931a';

    const yesterday = moment().subtract(1, 'days').format('YYYYMMDD');

    /* const data = {
      foo: {
        bar: 'good',
      },
    };

    const { foo: { bar } } = data;
     */
    axios.get(
      KOBIS_BOX_OFFICE_URI, {
        params: {
          key: KOBIS_KEY,
          targetDt: yesterday,
          repNationCD: 'K'
        }
      }
    ).then(response => {
      this.movies = response.data.boxOfficeResult.dailyBoxOfficeList;

      Promise.all(this.movies.map(async (movie, index) => {
        const infoResponse = await axios.get(
            KOBIS_MOVIE_URI, {
                params: {
                    key: KOBIS_KEY,
                    movieCd: movie.movieCd
                }
            }
        );

        const posterResponse = await axios.get(
            TMDB_SEARCH_URI, {
                params: {
                    api_key: TMDB_KEY,
                    language: 'ko-KR',
                    query: movie.movieNm,
                    year: moment(movie.openDt).format('YYYY'),
                }
            }
            
        );  

        this.movies[index] = {
            ...movie,
            ...infoResponse.data.movieInfoResult.movieInfo,
            poster: TMDB_POSTER_URI+posterResponse.data.results[0].poster_path,
        };
      })).finally(() => this.is_loading = false);
    });
  },

  components: {
    Movie 
  }
}

</script>