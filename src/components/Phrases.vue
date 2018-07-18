<template>
  <div v-document-title="name">
    <md-switch class="md-primary filter" v-model="filterFavorites"></md-switch>

    <h1 class="md-headline">{{ name }}</h1>

    <md-field>
      <md-icon>search</md-icon>
      <label>Search...</label>
      <md-input v-model="filter"></md-input>
    </md-field>

    <md-list class="md-double-line">
      <md-list-item v-if="notes" md-expand>
        <md-icon>info</md-icon>
        <span class="md-list-item-text">Notes</span>
        <div slot="md-expand">
          <div class="notes" v-html="notes"></div>
        </div>
      </md-list-item>

      <md-list-item v-for="phrase in filteredPhrases" :key="phrase.id">
        <div class="md-list-item-text">
          <template v-if="!$store.state.settings.swapLanguages">
            <span>{{ phrase.english }}</span>
            <span>{{ phrase.japanese }} <em>{{ phrase.romaji }}</em></span>
          </template>
          <template v-else>
            <span>{{ phrase.japanese }}</span>
            <span>{{ phrase.romaji }} <em>{{ phrase.english }}</em></span>
          </template>
        </div>

        <md-button class="md-icon-button md-list-action" :md-ripple="false"
                   @click="toggleFavorite(phrase.id)">
          <md-icon v-if="isFavorite(phrase.id)" class="md-primary">favorite</md-icon>
          <md-icon v-else class="md-primary">favorite_border</md-icon>
        </md-button>
      </md-list-item>

      <template v-for="set in subsets">
        <md-subheader :key="set.id">{{ set.name }}</md-subheader>
      </template>
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'Phrases',
  props: ['set'],
  data() {
    return {
      filter: '',
    };
  },
  computed: {
    filterFavorites: {
      get() {
        return this.$store.state.settings.filterFavorites;
      },
      set(value) {
        this.$store.commit('TOGGLE_SETTING_FILTER_FAVORITES', value);
      },
    },
    name() {
      return this.$store.getters.setName(this.set);
    },
    notes() {
      return this.$store.getters.setNotes(this.set);
    },
    phrases() {
      return this.$store.getters.phrases(this.set);
    },
    filteredPhrases() {
      let phrases = this.phrases;
      if (this.filter.length) {
        phrases = phrases.filter((phrase) => {
          const haystack = (phrase.japanese + phrase.english + phrase.romaji).toLowerCase();
          return haystack.includes(this.filter.toLowerCase());
        });
      }
      if (this.filterFavorites) {
        phrases = phrases.filter(phrase => this.isFavorite(phrase.id));
      }
      return phrases;
    },
    subsets() {
      return this.$store.getters.subsets(this.set);
    },
  },
  methods: {
    isFavorite(phrase) {
      return this.$store.getters.isFavorite(phrase);
    },
    toggleFavorite(phrase) {
      if (this.isFavorite(phrase)) {
        this.$store.dispatch('REMOVE_FAVORITE', phrase);
      } else {
        this.$store.dispatch('ADD_FAVORITE', phrase);
      }
    },
  },
};
</script>

<style scoped>
  .filter {
    float: right;
    margin-top: 6px;
    margin-right: 10px;
  }
  .md-list-item-text {
    white-space: normal;
  }
  .notes {
    margin: 1em;
    white-space: normal;
  }
  .md-icon:after {
    background-color: var(--md-theme-default-background, #fff) !important;
  }
</style>
