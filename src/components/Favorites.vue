<template>
  <div v-document-title="`Favorites`" v-meta-description="``">
    <div class="filter">
      <md-button :class="{ 'md-icon-button': true, 'md-primary': sortAlphabetically }"
                 @click="sortAlphabetically = !sortAlphabetically">
        <md-icon>sort_by_alpha</md-icon>
      </md-button>
    </div>

    <h1 class="md-headline">Favorites</h1>

    <md-field>
      <md-icon>search</md-icon>
      <label>Search...</label>
      <md-input v-model="filter"></md-input>
    </md-field>

    <md-list class="md-double-line">
      <Phrase v-for="phrase in filteredPhrases"
              :phrase="phrase" :key="phrase.id" :onlyRemoveFavorites="true"></Phrase>
    </md-list>
  </div>
</template>

<script>
import Phrase from '@/components/Phrase';

export default {
  name: 'Favorites',
  components: {
    Phrase,
  },
  data() {
    return {
      filter: '',
    };
  },
  computed: {
    sortAlphabetically: {
      get() {
        return this.$store.state.settings.sortAlphabetically;
      },
      set(value) {
        this.$store.commit('TOGGLE_SETTING_SORT_ALPHABETICALLY', value);
      },
    },
    phrases() {
      return this.$store.getters.favorites;
    },
    filteredPhrases() {
      let phrases = this.phrases;
      if (this.filter.length) {
        phrases = phrases.filter((phrase) => {
          const haystack = (phrase.japanese + phrase.english + phrase.romaji).toLowerCase();
          return haystack.includes(this.filter.toLowerCase());
        });
      }
      if (this.sortAlphabetically) {
        phrases = [...phrases].sort((a, b) => {
          if (a.english.toLowerCase() < b.english.toLowerCase()) {
            return -1;
          } else if (a.english.toLowerCase() > b.english.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      }
      return phrases;
    },
  },
};
</script>

<style lang="scss" scoped>
  .filter {
    float: right;
    margin-top: -(40px - 32px) / 2;
  }
  .md-icon:after {
    background-color: var(--md-theme-default-background, #fff) !important;
  }
</style>
