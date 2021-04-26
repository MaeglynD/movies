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
        Trending
      </div>
    </div>

    <div class="m-app">
      <!-- Controls (search, filter etc) -->
      <div class="m-controls">
        <v-text-field
          v-model="searchTerm"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          solo
          class="m-search"
          hide-details
          color="white"
          flat
          background-color="rgba(0, 0, 0, 0)"
        />

        <!-- Star rating -->
        <v-menu
          :close-on-content-click="false"
          offset-y
          fixed
          attach=".m-controls"
          nudge-bottom="20"
          min-width="300"
          max-width="300"
        >
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

              {{ starRange[0] }} -
              {{ starRange[1] }}
            </div>
          </template>

          <v-card class="m-star-rating-menu">
            <v-range-slider
              v-model="starRange"
              :max="10"
              :min="0"
              hide-details
              color="#fd8f38"
              step="0.5"
            />
          </v-card>
        </v-menu>

        <!-- Age group -->
        <v-menu
          offset-y
          fixed
          attach=".m-controls"
          nudge-bottom="20"
          min-width="130"
        >
          <template #activator="{ on, attrs }">
            <div
              v-ripple
              v-bind="attrs"
              class="m-control m-age-group"
              v-on="on"
            >
              <v-icon
                size="20"
                color="#8e8e8e"
              >
                mdi-account-supervisor
              </v-icon>
              {{ ageGroup }}
            </div>
          </template>

          <v-list class="m-age-group-menu">
            <v-list-item
              v-for="(group) in ['Adults only', 'Any']"
              :key="group"
              @click="ageGroup = group"
            >
              <v-list-item-title>
                {{ group }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Age group -->
        <v-menu
          offset-y
          fixed
          :close-on-content-click="false"
          attach=".m-controls"
          nudge-bottom="20"
          max-width="400"
          left
        >
          <template #activator="{ on, attrs }">
            <!-- Genre -->
            <div
              v-ripple
              v-bind="attrs"
              class="m-control m-genre"
              v-on="on"
            >
              <v-icon
                size="20"
                color="#8e8e8e"
              >
                mdi-pound
              </v-icon>

              <template v-if="selectedGenreIndexes.length">
                {{ genres[selectedGenreIndexes[0]].name }}

                <div
                  v-if="selectedGenreIndexes.length !== 1"
                  class="m-other"
                >
                  (+{{ selectedGenreIndexes.length - 1 }} others)
                </div>
              </template>
              <template v-else>
                <div class="m-other">
                  No genres selected
                </div>
              </template>
            </div>
          </template>

          <v-card class="m-genres-menu">
            <v-chip-group
              v-model="selectedGenreIndexes"
              column
              multiple
            >
              <v-chip
                v-for="({ name, id }) in genres"
                :key="`genre-${id}`"
                filter
                outlined
              >
                {{ name }}
              </v-chip>
            </v-chip-group>
          </v-card>
        </v-menu>

        <!-- Sort -->
        <v-menu
          offset-y
          fixed
          attach=".m-controls"
          nudge-bottom="20"
          min-width="130"
          left
        >
          <template #activator="{ on, attrs }">
            <div
              v-ripple
              v-bind="attrs"
              class="m-control m-sort"
              v-on="on"
            >
              <v-icon
                size="20"
                color="#8e8e8e"
              >
                mdi-sort
              </v-icon>

              {{ activeSort }}
            </div>
          </template>

          <v-list class="m-age-group-menu">
            <v-list-item
              v-for="(sortItem) in Object.keys(sortingPossibilities)"
              :key="sortItem"
              @click="activeSort = sortItem"
            >
              <v-list-item-title>
                {{ sortItem }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- Movie listings -->
      <div class="m-movie-listings">
        <div
          v-for="(movie, i) in filteredNowPlaying"
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
import { sortingPossibilities } from '../utils';

export default {
  data: () => ({
    sortingPossibilities,
    headerBackgroundImage: '',
    searchTerm: '',
    activeSort: 'Most popular',
    ageGroup: 'Any',
    selectedGenreIndexes: [],
    starRange: [3, 10],

  }),

  computed: {
    // Vuex state
    ...mapState([
      'pageState',
      'nowPlaying',
      'genres',
    ]),

    // Vuex getters
    ...mapGetters([
      //
    ]),

    filteredNowPlaying() {
      const {
        sortingPossibilities,
        selectedGenreIndexes,
        nowPlaying,
        starRange,
        genres,
        activeSort,
        searchTerm,
        ageGroup,
      } = this;

      const selectedGenres = selectedGenreIndexes.map((genreIndex) =>
        genres[genreIndex].id,
      );

      return this.nowPlaying
        // Filter the data by the users selected configuration
        .filter(({ title, genre_ids, adult }, i) => {
          // Search term...
          if (!title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
          }

          // Genres...
          if (!genre_ids.some((id) => selectedGenres.includes(id))) {
            return false;
          }

          // Age group...
          if (ageGroup !== 'Any' && !adult) {
            return false;
          }

          // Include in selection
          return true;
        })

        // Sort by selected configuartion
        .sort(sortingPossibilities[activeSort]);
    },
  },

  async created() {
    await this.getNowPlaying();
    await this.getGenres();

    // On initilalization, we select all genres. The chips
    // used for selecting genres use indexes
    this.selectedGenreIndexes = this.genres.map((x, i) => i);
  },

  methods: {
    // Vuex actions
    ...mapActions([
      'getNowPlaying',
      'getGenres',
    ]),
  },
};
</script>

<style scoped lang="scss">
  @import '~/assets/scss/app.scss';
</style>
