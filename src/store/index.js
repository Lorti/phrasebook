/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

import localforage from 'localforage';

const KEY_FAVORITES = 'favorites';
const KEY_SETTINGS = 'settings';

Vue.use(Vuex);

const actions = {
  async FETCH_DATABASE({ commit, state }) {
    const { phrases, sets } = await fetch('/data/default.json').then(response => response.json());
    commit('SET_SETS', sets);
    commit('SET_PHRASES', phrases);

    const favorites = JSON.parse(await localforage.getItem(KEY_FAVORITES));
    if (favorites) {
      const validPhrases = Object.values(state.phrases).map(phrase => phrase.id);
      commit('SET_FAVORITES', favorites.filter(id => validPhrases.includes(id)));
    }

    const settings = JSON.parse(await localforage.getItem(KEY_SETTINGS));
    if (settings) {
      commit('SET_SETTINGS', settings);
    }
  },
  async ADD_FAVORITE({ commit, state }, phrase) {
    commit('ADD_FAVORITE', phrase);
    await localforage.setItem(KEY_FAVORITES, JSON.stringify(state.favorites));
  },
  async REMOVE_FAVORITE({ commit, state }, phrase) {
    commit('REMOVE_FAVORITE', phrase);
    await localforage.setItem(KEY_FAVORITES, JSON.stringify(state.favorites));
  },
  async TOGGLE_SETTING_SORT_ALPHABETICALLY({ commit, state }, value) {
    commit('TOGGLE_SETTING_SORT_ALPHABETICALLY', value);
    await localforage.setItem(KEY_SETTINGS, JSON.stringify(state.settings));
  },
  async TOGGLE_SETTING_FILTER_FAVORITES({ commit, state }, value) {
    commit('TOGGLE_SETTING_FILTER_FAVORITES', value);
    await localforage.setItem(KEY_SETTINGS, JSON.stringify(state.settings));
  },
  async TOGGLE_SETTING_SPEECH_SYNTHESIS({ commit, state }, value) {
    commit('TOGGLE_SETTING_SPEECH_SYNTHESIS', value);
    await localforage.setItem(KEY_SETTINGS, JSON.stringify(state.settings));
  },
  async TOGGLE_SETTING_SWAP_LANGUAGES({ commit, state }, value) {
    commit('TOGGLE_SETTING_SWAP_LANGUAGES', value);
    await localforage.setItem(KEY_SETTINGS, JSON.stringify(state.settings));
  },
};

const mutations = {
  SET_SETS: (state, sets) => {
    state.sets = sets;
  },
  SET_PHRASES: (state, phrases) => {
    state.phrases = phrases;
  },
  SET_FAVORITES: (state, favorites) => {
    state.favorites = favorites;
  },
  SET_SETTINGS: (state, settings) => {
    // `Object.assign()` to add further settings in future versions.
    state.settings = Object.assign({}, state.settings, settings);
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
  TOGGLE_SETTING_SORT_ALPHABETICALLY: (state, value) => {
    state.settings.sortAlphabetically = value;
  },
  TOGGLE_SETTING_FILTER_FAVORITES: (state, value) => {
    state.settings.filterFavorites = value;
  },
  TOGGLE_SETTING_SPEECH_SYNTHESIS: (state, value) => {
    state.settings.speechSynthesis = value;
  },
  TOGGLE_SETTING_SWAP_LANGUAGES: (state, value) => {
    state.settings.swapLanguages = value;
  },
};

const getters = {
  // Sets
  set: state => setId => (Object.hasOwnProperty.call(state.sets, setId) ? state.sets[setId] : null),
  sets: (state) => {
    const sets = Object.values(state.sets);
    const subsets = sets.reduce((_subsets, set) => _subsets.concat(set.subsets), []);
    return sets.filter(set => !subsets.includes(set.id));
  },
  subsets: (state, _getters) => (setId) => {
    const setObject = _getters.set(setId);
    if (!setObject || !Object.hasOwnProperty.call(setObject, 'subsets')) {
      return [];
    }
    return Object.values(state.sets)
      .filter(set => setObject.subsets.includes(set.id));
  },
  setName: (state, _getters) => (setId) => {
    const set = _getters.set(setId);
    return set ? set.name : null;
  },
  setNotes: (state, _getters) => (setId) => {
    const set = _getters.set(setId);
    return set ? set.notes : null;
  },

  // Phrases
  phrases: state => (setId) => {
    if (!setId) {
      return Object.values(state.phrases);
    }
    return Object.values(state.phrases)
      .filter(phrase => phrase.sets.includes(setId));
  },
  phrasesCount: (state, _getters) => (setId) => {
    const subsetsPhrasesCount = _getters.subsets(setId)
      .reduce((count, subset) => count + _getters.phrasesCount(subset.id), 0);
    return _getters.phrases(setId).length + subsetsPhrasesCount;
  },
  firstPhrase: (state, _getters) => (setId) => {
    const phrases = _getters.phrases(setId);
    return phrases ? phrases.shift() : null;
  },

  // Favorites
  favorites: (state, _getters) => Object.values(state.phrases)
    .filter(phrase => _getters.isFavorite(phrase.id)),
  isFavorite: state => phrase => state.favorites.includes(phrase),
  favoritesCount: state => state.favorites.length,

  // Miscellaneous
  totalPhrases: (state, _getters) => Math.round(_getters.phrasesCount() / 10) * 10,
  totalSets: (state, _getters) => _getters.sets.length,
};

export default new Vuex.Store({
  state: {
    phrases: {},
    sets: {},
    favorites: [],
    settings: {
      sortAlphabetically: false,
      filterFavorites: false,
      speechSynthesis: true,
      swapLanguages: false,
    },
  },
  actions,
  mutations,
  getters,
});
