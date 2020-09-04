<template>
    <a class="movie" :href="`https://search.naver.com/search.naver?${encodeURI(`sm=top_hty&fbm=1&ie=utf8&query=${movieNm}`)}`" target="_blank" rel="noopener noreferrer">
        <img :src="poster" :alt="movieNm" />

        <div class="movie__data">
            <div class="movie__header">
                <h4 class="movie__title">{{movieNm}}</h4>
                <h5 class="movie__subtitle">{{movieNmEn}}</h5>
            </div>

            <div class="movie__info">
                <p class="movie__openat">
                    <span>개봉일</span> {{openDate}}
                </p>

                <p class="movie__status">
                    <span>제작상태</span> {{prdtStatNm}}
                </p>
            </div>

            <div class="movie__info">
                <p class="movie__audits">
                    <span>관람등급</span> {{audits[0].watchGradeNm}}
                </p>

                <p class="movie__showtimes">
                    <span>상영시간</span> {{showTm}}
                </p>

                <p class="movie__nations">
                    <span>제작국가</span> {{nations[0].nationNm}}
                </p>
            </div>

            <div class="movie__info">
                <p class="movie__directors">
                    <span>감독</span> {{directors[0].peopleNm}}
                </p>

                <p class="movie__genres">
                    <span>장르</span> {{genres.map( (genre) => genre.genreNm ).join(' / ')}}
                </p>

                <p class="movie__distributor">
                    <span>배급사</span> {{companys.filter(company => company.companyPartNm == "배급사")[0].companyNm}}
                </p>
            </div>
        </div>
    </a>
</template>

<script>
import moment from "moment"

export default {
    
    props: {
        movieInfo: {
            type: Object,
            required: true,
        }
    },

    data: (vue) => ({
        ...vue.movieInfo,
    }),

    computed: {
        // openDate: function() {
        //     return moment(this.$data.openDt).format('YYYY-MM-DD');
        // }

        openDate() {
            return moment(this.openDt).format('YYYY-MM-DD');
        }

        //openDate: () => moment(this.$data.openDt).format('YYYY-MM-DD')
    }
    
}
</script>