// eslint-disable-next-line import/no-unresolved
import notFoundPng from '~/assets/img/notfound.png';
import { requestWrapper } from '../utils';

export const state = () => ({
  pageState: '',
  snackbar: {
    visible: false,
    color: '#2b9263',
    text: '',
  },
  baseUrl: '',
  nowPlaying: [],
});

export const mutations = {
  // Set rotas
  setNowPlaying(state, nowPlaying) {
    // Set in state with thumbnail and original URL's
    state.nowPlaying = nowPlaying.map((x) => {
      // If theres an image available to view, set said image...
      if (x.backdrop_path) {
        return {
          ...x,
          thumbnailUrl: `${state.baseUrl}w500${x.backdrop_path}`,
          originalUrl: `${state.baseUrl}original${x.backdrop_path}`,
        };
      }

      // If not, set the 'not found' image instead
      return {
        ...x,
        thumbnailUrl: notFoundPng,
        originalUrl: notFoundPng,
      };
    });
  },

  // Set base url
  setBaseUrl(state, baseUrl) {
    state.baseUrl = baseUrl;
  },

  // Set the page state
  setPageState(state, pageState) {
    state.pageState = pageState;
  },
};

export const actions = {
  // API call for /now_playing
  async getNowPlaying(context) {
    const { commit, state } = context;

    // If the baseUrl hasn't been instantiated, instantiate it
    if (!state.baseUrl) {
      await requestWrapper(context, async () => {
        const { data: { images } } = await this.$axios.get('configuration');
        commit('setBaseUrl', images.base_url);
      });
    }

    // Retrive data and set in state
    await requestWrapper(context, async () => {
      const { data: { results } } = await this.$axios.get('movie/now_playing');
      commit('setNowPlaying', results);
    });
  },

  // Show snackbar
  showSnackbar({ commit }, updatedSnackbar) {
    // Set the snackbar to visible
    commit('setSnackbarValues', { ...updatedSnackbar, visible: true });

    // Remove after 3 seconds
    setTimeout(() => {
      commit('setSnackbarValues', { visible: false });
    }, 3000);
  },
};

export const getters = {
  // Checks if the page is in a state of loading
  isLoading(state) {
    return state.pageState === 'loading';
  },
};
