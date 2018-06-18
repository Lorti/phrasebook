import Vue from 'vue';
import Vuex from 'vuex';
import localforage from 'localforage';

Vue.use(Vuex);

const actions = {
  async SET_PHRASES({ commit }) {
    const { phrases } = await localforage.getItem('data');
    commit('SET_PHRASES', phrases);
  },
  async SET_SETS({ commit }) {
    const { sets } = await localforage.getItem('data');
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
};

const getters = {
  phrases: state => (set) => {
    const list = [...Object.values(state.phrases)];
    if (!set) {
      return list;
    }
    return list.filter(phrase => phrase.sets.includes(set));
  },
};

export default new Vuex.Store({
  state: {
    phrases: null,
    sets: null,
  },
  actions,
  mutations,
  getters,
});
