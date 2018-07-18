<template>
  <div v-document-title="``">
    <md-list class="md-triple-line">
      <md-list-item v-for="set in sets" :key="set.id" :to="`/sets/${ set.id }/${ set.slug }`">
        <div class="md-list-item-text">
          <span>{{ set.name }}</span>
          <span>{{ phrasesCount(set.id) }} phrases</span>
          <p v-if="firstPhrase(set.id)">{{ firstPhrase(set.id).japanese }}…</p>
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
      return this.$store.getters.sets;
    },
    favoritesCount() {
      return this.$store.getters.favorites.length;
    },
  },
  methods: {
    phrasesCount(setId) {
      return this.$store.getters.phrasesCount(setId);
    },
    firstPhrase(setId) {
      return this.$store.getters.firstPhrase(setId);
    },
  },
};
</script>
