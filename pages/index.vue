<template>
  <div class="m-container">
    <!-- Header -->
    <div class="m-header">
      <!-- Background image -->
      <div
        class="m-image-background"
      />

      <!-- Gradient overlay -->
      <div class="m-image-gradient" />

      <!-- Title -->
      <div class="m-title">
        Movies now playing
      </div>
    </div>

    <div class="m-app">
      <!-- Controls (search, filter etc) -->
      <div class="m-controls">
        <v-text-field
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          solo
          class="m-search"
          hide-details
          color="white"
          background-color="#212121"
        />

        <!-- Star rating -->
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <div
              v-ripple
              v-bind="attrs"
              class="m-control m-star-rating"
              v-on="on"
            >
              <v-icon
                size="18"
                color="#fd8f38"
              >
                mdi-star
              </v-icon>

              8.3 - 9.3
            </div>
          </template>

          <div class="m-control-menu">
            <v-range-slider
              v-model="starRange"
              :max="10"
              :min="0"
              hide-details
              step="0.5"
            >
              <template #prepend>
                0
              </template>
              <template #append>
                10
              </template>
            </v-range-slider>
          </div>
        </v-menu>

        <!-- Age group -->
        <div
          v-ripple
          class="m-control m-age-group"
        >
          <v-icon
            size="20"
            color="#8e8e8e"
          >
            mdi-account-supervisor
          </v-icon>

          All
        </div>

        <!-- Genre -->
        <div
          v-ripple
          class="m-control m-genre"
        >
          <v-icon
            size="20"
            color="#8e8e8e"
          >
            mdi-pound
          </v-icon>

          Sci-fi

          <div class="m-other">
            (+3 others)
          </div>
        </div>

        <!-- Sort -->
        <div
          v-ripple
          class="m-control m-sort"
        >
          <v-icon
            size="20"
            color="#8e8e8e"
          >
            mdi-sort
          </v-icon>

          Popularity
        </div>
      </div>

      <!-- Movie listings -->
      <div class="m-movie-listings">
        <div
          v-for="(movie, i) in nowPlaying"
          :key="`movie-${i}`"
          class="m-movie"
        >
          <img
            :src="movie.thumbnailUrl"
          >

          <div class="m-movie-title">
            {{ movie.title }}
          </div>

          <div class="m-movie-subtitle">
            {{ movie.vote_average }} rating · {{ movie.vote_count }} votes
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  data: () => ({
    headerBackgroundImage: '',
    starRange: [3, 10],
  }),

  computed: {
    // Vuex state
    ...mapState([
      'pageState',
      'nowPlaying',
    ]),

    // Vuex getters
    ...mapGetters([
      //
    ]),
  },

  async created() {
    await this.getNowPlaying();

    // console.log(this.nowPlaying);

    // // Set the header background image to the first item in nowPlaying
    // this.headerBackgroundImage = this.nowPlaying[
    //   Math.floor(Math.random() * this.nowPlaying.length)
    // ].originalUrl;
  },

  methods: {
    // Vuex actions
    ...mapActions([
      'getNowPlaying',
    ]),
  },
};
</script>

<style scoped lang="scss">
  @import '~/assets/scss/app.scss';
</style>
