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
