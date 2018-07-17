<template>
  <div v-document-title="`Favorites`">
    <h1 class="md-headline">Favorites</h1>

    <md-field>
      <md-icon>search</md-icon>
      <label>Search...</label>
      <md-input v-model="filter"></md-input>
    </md-field>

    <md-list class="md-double-line">
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
                   @click="removeFavorite(phrase)">
          <md-icon class="md-primary">close</md-icon>
        </md-button>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'Favorites',
  data() {
    return {
      filter: '',
    };
  },
  computed: {
    phrases() {
      return this.$store.getters.favorites;
    },
    filteredPhrases() {
      if (this.filter.length) {
        return this.phrases.filter((phrase) => {
          const haystack = (phrase.japanese + phrase.english + phrase.romaji).toLowerCase();
          return haystack.includes(this.filter.toLowerCase());
        });
      }
      return this.phrases;
    },
  },
  methods: {
    removeFavorite(phrase) {
      // eslint-disable-next-line no-alert
      if (confirm(`Do you really want to remove ${phrase.japanese} from your favorites?`)) {
        this.$store.dispatch('REMOVE_FAVORITE', phrase.id);
      }
    },
  },
};
</script>

<style scoped>
  .md-list-item-text {
    white-space: normal;
  }
  .md-icon:after {
    background-color: var(--md-theme-default-background, #fff) !important;
  }
</style>
