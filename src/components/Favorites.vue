<template>
  <div v-document-title="`Favorites`" v-meta-description="``">
    <div class="filter" v-if="phrases.length">
      <md-button :class="{ 'md-icon-button': true, 'md-primary': sortAlphabetically }"
                 @click="sortAlphabetically = !sortAlphabetically">
        <md-icon>sort_by_alpha</md-icon>
      </md-button>
    </div>

    <h1 class="md-headline">Favorites</h1>

    <template v-if="phrases.length">
      <md-field>
        <md-icon>search</md-icon>
        <label>Search...</label>
        <md-input v-model="filter"></md-input>
      </md-field>

      <md-list class="md-double-line">
        <Phrase v-for="phrase in filteredPhrases"
                :phrase="phrase" :key="phrase.id" :onlyRemoveFavorites="true"></Phrase>
      </md-list>
    </template>

    <template v-else>
      <div class="empty">
        Use the
        <md-icon style="color: currentColor;">favorite_outline</md-icon>
        button to add phrases to your favorites. The
        <md-icon style="color: currentColor;">filter_list</md-icon>
        filter in topics then allows you to quickly access what you need.
      </div>
    </template>
  </div>
</template>

<script>
import Phrase from '@/components/Phrase.vue';

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
        this.$store.dispatch('TOGGLE_SETTING_SORT_ALPHABETICALLY', value);
      },
    },
    phrases() {
      return this.$store.getters.favorites;
    },
    filteredPhrases() {
      let { phrases } = this;
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
  .empty {
    padding: 16px;
  }
</style>
