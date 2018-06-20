<template>
  <div>
    <dl v-for="phrase in phrases" :key="phrase.id">
      <label>
        <input type="checkbox"
               :checked="isFavorite(phrase.id)"
               @change="toggleFavorite(phrase.id)">
        <span v-if="isFavorite(phrase.id)">★</span>
        <span v-else>☆</span>
      </label>
      <dt>{{ phrase.english }}</dt>
      <dd>
        {{ phrase.japanese }}
        <em>{{ phrase.romaji }}</em>
      </dd>
    </dl>
  </div>
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

<style scoped lang="scss">
dt {
  font-weight: bold;
}
label {
  width: 44px;
  height: 44px;
  float: right;
  text-align: right;
}
input {
  display: none;
}
</style>
