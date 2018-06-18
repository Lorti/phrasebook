<template>
  <div>
    <section v-for="set in sets" :key="set.id">
      <h2>{{ set.name }}</h2>
      <dl v-for="phrase in phrases(set.id)" :key="phrase.id">
        <dt>{{ phrase.english }}</dt>
        <dd>
          {{ phrase.japanese }}
          <em>{{ phrase.romaji }}</em>
        </dd>
      </dl>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      showPronunciation: false,
    };
  },
  computed: {
    sets() {
      return this.$store.state.sets;
    },
  },
  methods: {
    phrases(set) {
      return this.$store.getters.phrases(set);
    },
  },
};
</script>

<style scoped>
dt {
  font-weight: bold;
}
</style>
