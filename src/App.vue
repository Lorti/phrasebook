<template>
  <md-app :md-scrollbar="false">
    <md-app-toolbar class="md-primary">
      <router-link to="/" class="md-title">🇯🇵 Phrasebook</router-link>

      <div class="md-toolbar-section-end">
        <md-button @click="menuVisible = !menuVisible">
          <md-icon>more_vert</md-icon>
        </md-button>
      </div>
    </md-app-toolbar>

    <md-app-drawer class="md-right" :md-active.sync="menuVisible">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Settings</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>swap_vert</md-icon>
          <span class="md-list-item-text">
            <md-checkbox v-model="swapLanguages">Swap English/Japanese</md-checkbox>
          </span>
        </md-list-item>
      </md-list>

      <md-divider></md-divider>
      <md-subheader>Support</md-subheader>

      <md-list>
        <md-list-item href="https://github.com/Lorti/phrasebook">
          <md-icon>code</md-icon>
          <span class="md-list-item-text">GitHub Repository</span>
        </md-list-item>
        <md-list-item href="https://www.paypal.me/manuninja">
          <md-icon>mood</md-icon>
          <span class="md-list-item-text">Donate via PayPal</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

    <md-app-content>
      <router-view/>

      <footer class="md-caption">
        <p>
          🇯🇵 Phrasebook is an interactive Japanese phrasebook optimized for travel and offline usage, using data from <a href="https://wikitravel.org/en/Japanese_phrasebook" target="_blank">Wikitravel</a>.
        </p>
        <p>Developed with ❤️ by Manuel Wieser</p>
        <p><a href="https://twitter.com/manuelwieser">@manuelwieser</a> | <a href="https://manu.ninja">manu.ninja</a></p>
        <p><a href="https://www.paypal.me/manuninja"><img src="./assets/paypal.svg" alt="Donate"></a></p>
        <p>© {{ (new Date()).getFullYear() }} Manuel Wieser</p>
      </footer>
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      menuVisible: false,
    };
  },
  computed: {
    swapLanguages: {
      get() {
        return this.$store.state.settings.swapLanguages;
      },
      set(value) {
        this.$store.commit('TOGGLE_SETTING_SWAP_LANGUAGES', value);
      },
    },
  },
};
</script>

<style lang="scss">
  @import "~vue-material/dist/theme/engine";

  @include md-register-theme("default", (
    primary: md-get-palette-color(red, 500),
    accent: md-get-palette-color(cyan, 500)
  ));

  @import "~vue-material/dist/theme/all";

  html,
  body,
  .md-app {
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none !important;
  }

  footer {
    margin: 2em 0;
    text-align: center;
  }
</style>
