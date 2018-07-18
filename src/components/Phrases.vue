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

      <phrase v-for="phrase in filteredPhrases(set)"
              :phrase="phrase" :key="phrase.id"></phrase>

      <template v-for="subset in subsets">
        <md-subheader :key="subset.id">{{ subset.name }}</md-subheader>

        <phrase v-for="phrase in filteredPhrases(subset.id)"
                :phrase="phrase" :key="phrase.id"></phrase>
      </template>
    </md-list>
  </div>
</template>

<script>
import Phrase from '@/components/Phrase';

export default {
  name: 'Phrases',
  components: {
    phrase: Phrase,
  },
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
    subsets() {
      return this.$store.getters.subsets(this.set);
    },
  },
  methods: {
    filteredPhrases(setId) {
      let phrases = this.$store.getters.phrases(setId);
      if (this.filter.length) {
        phrases = phrases.filter((phrase) => {
          const haystack = (phrase.japanese + phrase.english + phrase.romaji).toLowerCase();
          return haystack.includes(this.filter.toLowerCase());
        });
      }
      if (this.filterFavorites) {
        phrases = phrases.filter(phrase => this.$store.getters.isFavorite(phrase.id));
      }
      return phrases;
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
  .notes {
    margin: 1em;
    white-space: normal;
  }
  .md-icon:after {
    background-color: var(--md-theme-default-background, #fff) !important;
  }
</style>
