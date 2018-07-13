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
          <md-icon>cloud_upload</md-icon>
          <span class="md-list-item-text">Import</span>
        </md-list-item>
        <md-list-item>
          <md-icon>cloud_download</md-icon>
          <span class="md-list-item-text">Export</span>
        </md-list-item>
        <md-list-item href="https://manu.ninja">
          <md-icon>info</md-icon>
          <span class="md-list-item-text">Who’s behind Phrasebook?</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

    <md-app-content>
      <router-view/>

      <footer class="md-caption">
        <p>
          🇯🇵 Phrasebook is an interactive Japanese phrasebook optimized for travelling and offline usage, using data from <a href="https://wikitravel.org/en/Japanese_phrasebook" target="_blank">Wikitravel</a>.
        </p>
        <p>Developed with ❤️ by Manuel Wieser</p>
        <p><a href="https://twitter.com/manuelwieser">@manuelwieser</a> | <a href="https://manu.ninja">manu.ninja</a></p>
        <p><a href="https://www.paypal.me/manuninja"><img src="https://img.shields.io/badge/Donate-PayPal-blue.svg" alt="Donate"></a></p>
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
