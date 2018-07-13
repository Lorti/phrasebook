<template>
  <div>
    <md-field>
      <md-icon>search</md-icon>
      <label>Search...</label>
      <md-input v-model="filter"></md-input>
    </md-field>

    <md-list class="md-double-line">
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
    };
  },
  computed: {
    phrases() {
      return this.$store.getters.phrases(this.set);
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
    isFavorite(phrase) {
      return this.$store.getters.isFavorite(phrase);
    },
    toggleFavorite(phrase) {
      if (this.isFavorite(phrase)) {
        this.$store.commit('REMOVE_FAVORITE', phrase);
      } else {
        this.$store.commit('ADD_FAVORITE', phrase);
      }
    },
  },
};
</script>

<style scoped>
  .md-list-item-text {
    white-space: normal;
  }
</style>
