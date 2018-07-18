<template>
  <div v-document-title="``">
    <md-list class="md-triple-line">
      <md-list-item v-for="set in sets" :key="set.id" :to="`/sets/${ set.id }/${ set.slug }`">
        <div class="md-list-item-text">
          <span>{{ set.name }}</span>
          <span>{{ phrasesCount(set.id) }} phrases</span>
          <p>{{ firstPhrase(set.id).japanese }}…</p>
        </div>
      </md-list-item>
      <md-list-item v-if="favoritesCount" :to="`/sets/favorites`">
        <div class="md-list-item-text">
          Favorites ({{ favoritesCount }})
        </div>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'Sets',
  computed: {
    sets() {
      return this.$store.state.sets;
    },
    favoritesCount() {
      return this.$store.getters.favorites.length;
    },
  },
  methods: {
    phrasesCount(set) {
      return this.$store.getters.phrasesCount(set);
    },
    firstPhrase(set) {
      return this.$store.getters.firstPhrase(set);
    },
  },
};
</script>
