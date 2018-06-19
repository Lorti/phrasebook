<template>
  <div>
    <router-link v-for="set in sets" :key="set.id" :to="`/sets/${ set.id }`">
      {{ set.name }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Sets',
  computed: {
    sets() {
      return this.$store.state.sets;
    },
  },
};
</script>

<style scoped lang="scss">
$size: 8rem;
div {
  display: flex;
}
a {
  margin: 10px;
  width: $size;
  height: $size;
  border-radius: 3px;
  text-align: center;
  line-height: $size;
  font-size: 1.25rem;
  font-weight: bold;
  box-shadow: 0 3px 7px rgba(black, .25);
  cursor: pointer;
  transition: all .5s;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 7px 13px rgba(black, .25);
  }
}
</style>
