<template>
  <div>
    <dl v-for="phrase in phrases" :key="phrase.id">
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
};
</script>

<style scoped lang="scss">
dt {
  font-weight: bold;
}
</style>
