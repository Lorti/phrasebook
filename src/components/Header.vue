<template>
  <header>
    <div class="hero">
      <img src="/img/kinkaku-ji.jpg" alt="Kinkaku-ji (金閣寺)">
    </div>
<!--
    <div class="bar">
      <div class="copy">
        🇯🇵 {{totalPhrases}}+ phrases, {{totalSets}} topics, <br>
        optimized for travel and offline usage
      </div>
    </div>
-->
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    totalPhrases() {
      return this.$store.getters.totalPhrases;
    },
    totalSets() {
      return this.$store.getters.totalSets;
    },
  },
};
</script>

<style lang="scss" scoped>
  header {
    // margin: -16px -16px 16px;
    margin: -16px -16px 16px;
  }

  .hero {
    position: relative;
    margin: 0 auto;
    max-width: 600px;

    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    &:after {
      display: block;
      padding-top: 100% / (5 / 2);
      content: '';
    }
  }

  .bar {
    position: relative;
    margin-top: -16px;
    padding-left: 16px;
    padding-right: 16px;
  }

  .copy {
    margin: 0 auto;
    padding: 8px;
    max-width: 360px;
    background: #fff;
    text-align: center;
  }
</style>
