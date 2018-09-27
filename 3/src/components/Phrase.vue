<template>
  <md-list-item>
    <template v-if="speechSynthesis">
      <md-ripple>
        <span class="md-list-item-text"
              @click="speak"
              v-html="textContent"></span>
      </md-ripple>
    </template>
    <template v-else>
        <span class="md-list-item-text"
              v-html="textContent"></span>
    </template>

    <md-button class="md-icon-button md-list-action"
               v-if="!onlyRemoveFavorites"
               @click.stop="toggleFavorite(phrase.id)">
      <md-icon v-if="isFavorite(phrase.id)" class="md-primary">favorite</md-icon>
      <md-icon v-else class="md-primary">favorite_border</md-icon>
    </md-button>

    <md-button class="md-icon-button md-list-action"
               v-if="onlyRemoveFavorites"
               @click.stop="removeFavorite(phrase)">
      <md-icon class="md-primary">close</md-icon>
    </md-button>
  </md-list-item>
</template>

<script>
import speech from '../speech';

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
  computed: {
    speechSynthesis() {
      return this.$store.state.settings.speechSynthesis;
    },
    textContent() {
      if (!this.$store.state.settings.swapLanguages) {
        return `<span>${this.phrase.english}</span>
          <span>${this.phrase.japanese} <em>${this.phrase.romaji || ''}</em></span>`;
      }
      return `<span>${this.phrase.japanese}</span>
          <span>${this.phrase.romaji || ''} <em>${this.phrase.english}</em></span>`;
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
      // eslint-disable-next-line no-alert,no-restricted-globals
      if (confirm(`Do you really want to remove ${phrase.japanese} from your favorites?`)) {
        this.$store.dispatch('REMOVE_FAVORITE', phrase.id);
      }
    },
    speak() {
      let text = this.phrase.japanese;
      if (Object.hasOwnProperty.call(this.phrase, 'hiragana')) {
        text = this.phrase.hiragana;
      }
      speech.speak(text);
    },
  },
};
</script>

<style scoped>
  .md-list-item-text {
    white-space: normal;
  }
</style>
