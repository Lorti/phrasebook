import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const actions = {
  async FETCH_DATABASE({ commit }) {
    const { phrases, sets } = await fetch('/static/data.json')
      .then(response => response.json());
    commit('SET_PHRASES', phrases);
    commit('SET_SETS', sets);
  },
};

const mutations = {
  SET_PHRASES: (state, phrases) => {
    state.phrases = phrases;
  },
  SET_SETS: (state, sets) => {
    state.sets = sets;
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
};

const getters = {
  phrases: state => (set) => {
    const list = [...Object.values(state.phrases)];
    if (!set) {
      return list;
    }
    return list.filter(phrase => phrase.sets.includes(set));
  },
  isFavorite: state => phrase => state.favorites.includes(phrase),
  phrasesCount: (state, _getters) => set => _getters.phrases(set).length,
  firstPhrase: (state, _getters) => set => _getters.phrases(set).shift(),
};

export default new Vuex.Store({
  state: {
    phrases: {},
    sets: {},
    favorites: [],
  },
  actions,
  mutations,
  getters,
});
