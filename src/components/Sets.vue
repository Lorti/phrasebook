<template>
  <div v-document-title="``" v-meta-description="``">
    <h1 class="md-headline">Topics</h1>

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-33 md-small-size-50 md-xsmall-size-100"
           v-for="set in sets" :key="set.id">
        <router-link :to="`/sets/${ set.id }/${ set.slug }/`">
          <md-card md-with-hover>
            <md-ripple>
              <md-card-header>
                <div class="md-title">{{ set.name }}</div>
                <div class="md-subhead">
                  {{ phrasesCount(set.id) }} phrases
                </div>
              </md-card-header>
              <div class="md-card-content">
                「{{ firstPhrase(set.id).japanese }}」…
              </div>
            </md-ripple>
          </md-card>
        </router-link>
      </div>

      <div class="md-layout-item">
        <router-link :to="`/sets/favorites/`">
          <md-card md-with-hover class="md-primary">
            <md-ripple>
              <md-card-header>
                <div class="md-title">Favorites</div>
                <div class="md-subhead">
                  {{ favoritesCount }} phrases
                </div>
              </md-card-header>
              <div class="md-card-content">
                You can use the
                <md-icon style="color: currentColor;">favorite_outline</md-icon>
                to add phrases to your favorites!
              </div>
            </md-ripple>
          </md-card>
        </router-link>
      </div>
    </div>
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

<style scoped>
  .md-card {
    margin: 0 0 16px;
  }
  .md-card-content {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
