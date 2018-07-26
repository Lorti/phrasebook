<template>
  <div v-document-title="name" v-meta-description="description">
    <div class="filter">
      <md-button :class="{ 'md-icon-button': true, 'md-primary': sortAlphabetically }"
                 @click="sortAlphabetically = !sortAlphabetically">
        <md-icon>sort_by_alpha</md-icon>
      </md-button>

      <md-button :class="{ 'md-icon-button': true, 'md-primary': filterFavorites }"
                 @click="filterFavorites = !filterFavorites">
        <md-icon>filter_list</md-icon>
      </md-button>
    </div>

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
  props: {
    set: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      filter: '',
    };
  },
  created() {
    if (!this.$store.getters.set(this.set)) {
      this.$router.replace('/404');
    }
  },
  computed: {
    description() {
      const count = this.$store.getters.phrasesCount(this.set);
      const total = Math.floor(this.$store.getters.phrasesCount() / 10) * 10;
      return `🇯🇵 ${count} Japanese phrases regarding ${this.name}, which are part of more than ${total} phrases in the 100% free and open-source Japanese Phrasebook app optimized for travel and offline usage, using data from Wikitravel.`;
    },
    sortAlphabetically: {
      get() {
        return this.$store.state.settings.sortAlphabetically;
      },
      set(value) {
        this.$store.commit('TOGGLE_SETTING_SORT_ALPHABETICALLY', value);
      },
    },
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
      if (this.filterFavorites) {
        phrases = phrases.filter(phrase => this.$store.getters.isFavorite(phrase.id));
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
  .notes {
    margin: 1em;
    white-space: normal;
  }
  .md-icon:after {
    background-color: var(--md-theme-default-background, #fff) !important;
  }
</style>
