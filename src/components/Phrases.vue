<template>
  <md-list class="md-double-line">
    <template v-for="phrase in phrases">
      <md-list-item :key="phrase.id">
        <div class="md-list-item-text">
          <span>{{ phrase.english }}</span>
          <span>{{ phrase.japanese }} <em>{{ phrase.romaji }}</em></span>
        </div>

        <md-button class="md-icon-button md-list-action"
                   @click="toggleFavorite(phrase.id)">
          <md-icon v-if="isFavorite(phrase.id)" class="md-primary">favorite</md-icon>
          <md-icon v-else class="md-primary">favorite_border</md-icon>
        </md-button>
      </md-list-item>
    </template>
  </md-list>
</template>

<script>
export default {
  name: 'Phrases',
  props: ['set'],
  computed: {
    phrases() {
      return this.$store.getters.phrases(this.set);
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
