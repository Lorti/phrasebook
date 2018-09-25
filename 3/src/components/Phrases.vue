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

      <Phrase v-for="phrase in filteredPhrases(set)"
              :phrase="phrase" :key="phrase.id"></Phrase>

      <template v-for="subset in subsets">
        <md-subheader :key="subset.id">{{ subset.name }}</md-subheader>

        <Phrase v-for="phrase in filteredPhrases(subset.id)"
                :phrase="phrase" :key="phrase.id"></Phrase>
      </template>
    </md-list>
  </div>
</template>

<script>
import Phrase from '@/components/Phrase.vue';

export default {
  name: 'Phrases',
  components: {
    Phrase,
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
      return `⛩ ${this.phrasesCount} phrases regarding ${this.name}, which are part of 670+ essential phrases in the 100% free Japanese Phrasebook app, optimized for travel and offline usage.`;
    },
    sortAlphabetically: {
      get() {
        return this.$store.state.settings.sortAlphabetically;
      },
      set(value) {
        this.$store.dispatch('TOGGLE_SETTING_SORT_ALPHABETICALLY', value);
      },
    },
    filterFavorites: {
      get() {
        return this.$store.state.settings.filterFavorites;
      },
      set(value) {
        this.$store.dispatch('TOGGLE_SETTING_FILTER_FAVORITES', value);
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
    phrasesCount() {
      return this.$store.getters.phrasesCount(this.set);
    },
    totalPhrasesCount() {
      return this.$store.getters.totalPhrases;
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
  .md-icon:after {
    background-color: var(--md-theme-default-background, #fff) !important;
  }
</style>

<style lang="scss">
  .notes {
    margin: 1em;
    white-space: normal;

    dt {
      font-weight: bold;
    }
  }
</style>
