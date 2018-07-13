<template>
  <div>
    <md-switch class="md-primary filter" v-model="favorites" value="0"></md-switch>

    <h1 class="md-headline">{{ name }}</h1>

    <md-field>
      <md-icon>search</md-icon>
      <label>Search...</label>
      <md-input v-model="filter"></md-input>
    </md-field>

    <md-list class="md-double-line">
      <md-list-item md-expand>
        <md-icon>info</md-icon>
        <span class="md-list-item-text">Notes</span>
        <div slot="md-expand">
          <div class="notes" v-html="notes"></div>
        </div>
      </md-list-item>

      <md-list-item v-for="phrase in filteredPhrases" :key="phrase.id">
        <div class="md-list-item-text">
          <span>{{ phrase.english }}</span>
          <span>{{ phrase.japanese }} <em>{{ phrase.romaji }}</em></span>
        </div>

        <md-button class="md-icon-button md-list-action" :md-ripple="false"
                   @click="toggleFavorite(phrase.id)">
          <md-icon v-if="isFavorite(phrase.id)" class="md-primary">favorite</md-icon>
          <md-icon v-else class="md-primary">favorite_border</md-icon>
        </md-button>
      </md-list-item>
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
      favorites: false,
    };
  },
  computed: {
    name() {
      return Object.hasOwnProperty.call(this.$store.state.sets, this.set) ?
        this.$store.state.sets[this.set].name : '';
    },
    notes() {
      return Object.hasOwnProperty.call(this.$store.state.sets, this.set) ?
        this.$store.state.sets[this.set].notes : '';
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
      if (this.favorites) {
        phrases = phrases.filter(phrase => this.isFavorite(phrase.id));
      }
      return phrases;
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
