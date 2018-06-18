<template>
  <ul>
    <li v-for="set in sets" :key="set.id">
      {{ set.name }}
      <ul>
        <li v-for="phrase in phrases(set.id)" :key="phrase.id">
          <strong>{{ phrase.english }}</strong>
          {{ phrase.japanese }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
