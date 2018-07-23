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
      <md-subheader>Social</md-subheader>

      <md-list>
        <md-list-item href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.japanese-phrasebook.com%2F&quote=%F0%9F%87%AF%F0%9F%87%B5%20Phrasebook" target="_blank" rel="noopener">
          <md-icon>chat_bubble_outline</md-icon>
          <span class="md-list-item-text">Share on Facebook</span>
        </md-list-item>
        <md-list-item href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fwww.japanese-phrasebook.com%2F&text=%F0%9F%87%AF%F0%9F%87%B5%20Phrasebook:%20https%3A%2F%2Fwww.japanese-phrasebook.com%2F" target="_blank" rel="noopener">
          <md-icon>chat_bubble_outline</md-icon>
          <span class="md-list-item-text">Share on Twitter</span>
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
          🇯🇵 Phrasebook is a free Japanese phrasebook app optimized for travel and offline usage, using data from <a href="https://wikitravel.org/en/Japanese_phrasebook" target="_blank">Wikitravel</a>.
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

  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: local('Material Icons'), local('MaterialIcons-Regular'),
      url('/static/MaterialIcons-Regular.woff2') format('woff2'),
      url('/static/MaterialIcons-Regular.woff') format('woff');
  }

  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'liga';
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Roboto'), local('Roboto-Regular'),
      url('/static/roboto-v18-latin_latin-ext-regular.woff2') format('woff2'),
      url('/static/roboto-v18-latin_latin-ext-regular.woff') format('woff');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: local('Roboto Italic'), local('Roboto-Italic'),
      url('/static/roboto-v18-latin_latin-ext-italic.woff2') format('woff2'),
      url('/static/roboto-v18-latin_latin-ext-italic.woff') format('woff');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: local('Roboto Medium'), local('Roboto-Medium'),
      url('/static/roboto-v18-latin_latin-ext-500.woff2') format('woff2'),
      url('/static/roboto-v18-latin_latin-ext-500.woff') format('woff');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Roboto Bold'), local('Roboto-Bold'),
      url('/static/roboto-v18-latin_latin-ext-700.woff2') format('woff2'),
      url('/static/roboto-v18-latin_latin-ext-700.woff') format('woff');
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
