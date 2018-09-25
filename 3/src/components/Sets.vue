<template>
  <div v-document-title="``" v-meta-description="``">
    <h1 class="md-headline">Topics</h1>

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-33 md-small-size-50 md-xsmall-size-100"
           v-for="set in sets" :key="set.id">
        <router-link :to="`/sets/${ set.id }/${ set.slug }/`">
          <md-card>
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

      <div class="md-layout-item md-size-33 md-small-size-50 md-xsmall-size-100">
        <router-link :to="`/sets/favorites/`" rel="nofollow">
          <md-card class="md-primary">
            <md-ripple>
              <md-card-header>
                <div class="md-title">Favorites</div>
                <div class="md-subhead">
                  {{ favoritesCount }} phrases
                </div>
              </md-card-header>
              <div class="md-card-content">
                Use the
                <md-icon style="color: currentColor;">favorite_outline</md-icon>
                button to add phrases to your favorites. The
                <md-icon style="color: currentColor;">filter_list</md-icon>
                filter in topics then allows you to quickly access what you need.
              </div>
            </md-ripple>
          </md-card>
        </router-link>
      </div>
    </div>

    <h1 class="md-headline">Guides</h1>

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-33 md-small-size-50 md-xsmall-size-100">
        <a href="https://wikitravel.org/wiki/en/index.php?title=Japanese_phrasebook&oldid=2493591#Pronunciation_guide"
           target="_blank" rel="noopener">
          <md-card>
            <md-ripple>
              <md-card-header>
                <div class="md-title">Pronunciation</div>
              </md-card-header>
              <div class="md-card-content">
                Read Wikitravel’s pronunciation guide…
              </div>
            </md-ripple>
          </md-card>
        </a>
      </div>

      <div class="md-layout-item md-size-33 md-small-size-50 md-xsmall-size-100">
        <a href="https://wikitravel.org/wiki/en/index.php?title=Japanese_phrasebook&oldid=2493591#Grammar"
           target="_blank" rel="noopener">
          <md-card>
            <md-ripple>
              <md-card-header>
                <div class="md-title">Grammar</div>
              </md-card-header>
              <div class="md-card-content">
                Read Wikitravel’s grammar guide…
              </div>
            </md-ripple>
          </md-card>
        </a>
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
      return this.$store.getters.favoritesCount;
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
</style>
