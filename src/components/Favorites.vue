<template>
  <div v-document-title="`Favorites`">
    <h1 class="md-headline">Favorites</h1>

    <md-field>
      <md-icon>search</md-icon>
      <label>Search...</label>
      <md-input v-model="filter"></md-input>
    </md-field>

    <md-list class="md-double-line">
      <phrase v-for="phrase in filteredPhrases"
              :phrase="phrase" :key="phrase.id" onlyRemoveFavorites="true"></phrase>
    </md-list>
  </div>
</template>

<script>
import Phrase from '@/components/Phrase';

export default {
  name: 'Favorites',
  components: {
    phrase: Phrase,
  },
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
};
</script>

<style scoped>
  .md-icon:after {
    background-color: var(--md-theme-default-background, #fff) !important;
  }
</style>
