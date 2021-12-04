import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    smoke: ['1'],
    genres: [],
    favorite: {}
  },
  mutations: {
    smoke(state, smoke) {
      state.smoke = smoke;
      localStorage.setItem('smoke', JSON.stringify(state.smoke));
    },
    storageToSmoke(state) {
      try {
        const smoke = JSON.parse(localStorage.getItem('smoke'));
        state.smoke = smoke ? smoke : ['1'];
      } catch (e) {
        console.error(e);
      }
    },
    genres(state, genres) {
      state.genres = genres;
      localStorage.setItem('genres', JSON.stringify(state.genres));
    },
    storageToGenres(state) {
      try {
        const genres = JSON.parse(localStorage.getItem('genres'));
        state.genres = genres;
      } catch (e) {
        console.error(e);
      }
    },
    storageToFavorite(state) {
      try {
        const favorite = JSON.parse(localStorage.getItem('favorite'));
        state.favorite = favorite;
      } catch (e) {
        console.error(e);
      }
    },
    addFavorite(state, feature) {
      if (!state.favorite) state.favorite = {};
      state.favorite[feature.Gid] = feature;
      localStorage.setItem('favorite', JSON.stringify(state.favorite));
    },
    removeFavorite(state, feature) {
      delete state.favorite[feature.Gid];
      localStorage.setItem('favorite', JSON.stringify(state.favorite));
    },
    setFavorite(state, favorite) {
      state.favorite = favorite;
      localStorage.setItem('favorite', JSON.stringify(state.favorite));
    },
  },
  actions: {}
});
