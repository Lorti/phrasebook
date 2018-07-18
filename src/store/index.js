import Vue from 'vue';
import Vuex from 'vuex';

import localforage from 'localforage';

Vue.use(Vuex);

const actions = {
  async FETCH_DATABASE({ commit, state }) {
    const { phrases, sets } = await fetch('/static/data.json').then(response => response.json());
    commit('SET_PHRASES', phrases);
    commit('SET_SETS', sets);

    const favorites = JSON.parse(await localforage.getItem('favorites'));
    if (favorites) {
      const validPhrases = [...Object.values(state.phrases)].map(phrase => phrase.id);
      commit('SET_FAVORITES', favorites.filter(id => validPhrases.includes(id)));
    }
  },
  async ADD_FAVORITE({ commit, state }, phrase) {
    commit('ADD_FAVORITE', phrase);
    await localforage.setItem('favorites', JSON.stringify(state.favorites));
  },
  async REMOVE_FAVORITE({ commit, state }, phrase) {
    commit('REMOVE_FAVORITE', phrase);
    await localforage.setItem('favorites', JSON.stringify(state.favorites));
  },
};

const mutations = {
  SET_PHRASES: (state, phrases) => {
    state.phrases = phrases;
  },
  SET_SETS: (state, sets) => {
    state.sets = sets;
  },
  SET_FAVORITES: (state, favorites) => {
    state.favorites = favorites;
  },
  ADD_FAVORITE: (state, phrase) => {
    if (!state.favorites.includes(phrase)) {
      state.favorites.push(phrase);
    }
  },
  REMOVE_FAVORITE: (state, phrase) => {
    const index = state.favorites.indexOf(phrase);
    if (index !== -1) {
      state.favorites.splice(index, 1);
    }
  },
  TOGGLE_SETTING_FILTER_FAVORITES: (state, value) => {
    state.settings.filterFavorites = value;
  },
  TOGGLE_SETTING_SWAP_LANGUAGES: (state, value) => {
    state.settings.swapLanguages = value;
  },
};

const getters = {
  set: state => setId => (Object.hasOwnProperty.call(state.sets, setId) ? state.sets[setId] : null),
  sets: (state) => {
    const allSubsets = [...Object.values(state.sets)]
      .reduce((subsets, set) => subsets.concat(set.subsets), []);
    return [...Object.values(state.sets)].filter(set => !allSubsets.includes(set.id));
  },
  subsets: (state, _getters) => (setId) => {
    const setObject = _getters.set(setId);
    if (!setObject || !Object.hasOwnProperty.call(setObject, 'subsets')) {
      return [];
    }
    return [...Object.values(state.sets)].filter(set => setObject.subsets.includes(set.id));
  },
  setName: (state, _getters) => (setId) => {
    const set = _getters.set(setId);
    return set ? set.name : null;
  },
  setNotes: (state, _getters) => (setId) => {
    const set = _getters.set(setId);
    return set ? set.notes : null;
  },
  phrases: state => (setId) => {
    const list = [...Object.values(state.phrases)];
    if (!setId) {
      return list;
    }
    return list.filter(phrase => phrase.sets.includes(setId));
  },
  phrasesCount: (state, _getters) => (setId) => {
    const subsets = _getters.subsets(setId);
    const subsetsPhrasesCount =
      subsets.reduce((count, subset) => count + _getters.phrasesCount(subset.id), 0);
    return _getters.phrases(setId).length + subsetsPhrasesCount;
  },
  firstPhrase: (state, _getters) => (setId) => {
    const phrases = _getters.phrases(setId);
    return phrases ? phrases.shift() : null;
  },
  favorites: (state, _getters) => {
    const list = [...Object.values(state.phrases)];
    return list.filter(phrase => _getters.isFavorite(phrase.id));
  },
  isFavorite: state => phrase => state.favorites.includes(phrase),
};

export default new Vuex.Store({
  state: {
    phrases: {},
    sets: {},
    favorites: [],
    settings: {
      filterFavorites: false,
      swapLanguages: false,
    },
  },
  actions,
  mutations,
  getters,
});
