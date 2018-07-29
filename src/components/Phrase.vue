<template>
  <md-list-item>
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

    <md-button class="md-icon-button md-list-action"
               v-if="!onlyRemoveFavorites"
               @click="toggleFavorite(phrase.id)">
      <md-icon v-if="isFavorite(phrase.id)" class="md-primary">favorite</md-icon>
      <md-icon v-else class="md-primary">favorite_border</md-icon>
    </md-button>

    <md-button class="md-icon-button md-list-action"
               v-if="onlyRemoveFavorites"
               @click="removeFavorite(phrase)">
      <md-icon class="md-primary">close</md-icon>
    </md-button>
  </md-list-item>
</template>

<script>
export default {
  name: 'Phrases',
  props: {
    phrase: {
      type: Object,
      required: true,
    },
    onlyRemoveFavorites: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    isFavorite(phraseId) {
      return this.$store.getters.isFavorite(phraseId);
    },
    toggleFavorite(phraseId) {
      if (this.isFavorite(phraseId)) {
        this.$store.dispatch('REMOVE_FAVORITE', phraseId);
      } else {
        this.$store.dispatch('ADD_FAVORITE', phraseId);
      }
    },
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
</style>
