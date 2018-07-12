<template>
  <md-list class="md-triple-line">
    <template v-for="set in sets">
      <md-list-item :key="set.id" :to="`/sets/${ set.id }`">
        <div class="md-list-item-text">
          <span>{{ set.name }}</span>
          <span>{{ count(set.id) }} phrases</span>
          <p>{{ first(set.id).japanese }}…</p>
        </div>

        <md-button class="md-icon-button md-list-action">
          <md-icon class="md-primary">favorite_border</md-icon>
        </md-button>
      </md-list-item>
    </template>
  </md-list>
</template>

<script>
export default {
  name: 'Sets',
  computed: {
    sets() {
      return this.$store.state.sets;
    },
  },
  methods: {
    count(set) {
      return this.$store.getters.phrasesCount(set);
    },
    first(set) {
      return this.$store.getters.firstPhrase(set);
    },
  },
};
</script>
