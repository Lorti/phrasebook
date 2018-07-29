<template>
  <md-app :md-scrollbar="false">
    <md-app-toolbar class="md-primary">
      <router-link class="title" to="/">
        <img class="logo" src="./assets/logo.svg" alt="Logo">
        <span class="md-title"><span>Japanese</span> Phrasebook</span>
      </router-link>

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
        <md-list-item href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.japanese-phrasebook.com%2F&quote=Phrasebook" target="_blank" rel="noopener">
          <md-icon>chat_bubble_outline</md-icon>
          <span class="md-list-item-text">Share on Facebook</span>
        </md-list-item>
        <md-list-item href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fwww.japanese-phrasebook.com%2F&text=Phrasebook:%20https%3A%2F%2Fwww.japanese-phrasebook.com%2F" target="_blank" rel="noopener">
          <md-icon>chat_bubble_outline</md-icon>
          <span class="md-list-item-text">Share on Twitter</span>
        </md-list-item>
      </md-list>

      <md-divider></md-divider>
      <md-subheader>Contributing</md-subheader>

      <md-list>
        <md-list-item href="mailto:feedback@japanese-phrasebook.com">
          <md-icon>mail_outline</md-icon>
          <span class="md-list-item-text">feedback@japanese-phrasebook.com</span>
        </md-list-item>
        <md-list-item href="https://github.com/Lorti/phrasebook">
          <md-icon>code</md-icon>
          <span class="md-list-item-text">GitHub Repository</span>
        </md-list-item>
        <md-list-item href="https://www.paypal.me/manuninja">
          <md-icon>mood</md-icon>
          <span class="md-list-item-text">Donate via PayPal</span>
        </md-list-item>
      </md-list>

      <md-divider></md-divider>
      <md-list>
        <md-list-item>
          <span class="md-list-item-text">© {{ (new Date()).getFullYear() }} Manuel Wieser</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

    <md-app-content>
      <header>
        <img class="hero" src="/static/kinkaku-ji-1000-400.jpg">
        <div class="copy">
          <div class="area">
            🇯🇵 {{totalPhrases}}+ phrases, {{totalSets}} topics, <br>
            optimized for travel and offline usage
          </div>
        </div>
      </header>

      <router-view/>

      <footer class="md-caption">
        <p>🇯🇵 100% free and open-source Japanese Phrasebook app optimized for travel and offline usage, using data from <a href="https://wikitravel.org/en/Japanese_phrasebook" target="_blank" rel="noopener">Wikitravel</a>.</p>
        <p>Developed with ❤️ by Manuel Wieser</p>
        <p><a href="https://twitter.com/manuelwieser" target="_blank" rel="noopener">@manuelwieser</a> | <a href="https://manu.ninja" target="_blank" rel="noopener">manu.ninja</a></p>
        <p><a href="https://www.paypal.me/manuninja" target="_blank" rel="noopener"><img src="./assets/paypal.svg" alt="Donate"></a></p>
        <p>Logo by <a href="https://steemit.com/@happyksu" target="_blank" rel="noopener">Ksenia</a> | Pictures by <a href="https://www.instagram.com/daisimerollin/" target="_blank" rel="noopener">Daisy</a></p>
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
    totalPhrases() {
      return Math.round(this.$store.getters.phrasesCount() / 10) * 10;
    },
    totalSets() {
      return this.$store.getters.sets.length;
    }
  },
};
</script>

<style lang="scss">
  @import "styles/vue-material";
  @import "styles/fonts";

  .md-app {
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none !important;
  }

  .md-toolbar .md-title {
    max-width: 7.5em;
    font-weight: bold;
    line-height: 1;
    white-space: normal;

    span {
      display: block;
      font-size: 16px;
      font-weight: normal;
      text-transform: uppercase;
    }
  }

  .title {
    display: flex;
    align-items: center;
  }

  .logo {
    margin: 0 8px;
    height: 32px !important;
    width: 32px !important;
  }

  header {
    margin: -16px -16px 16px;

    .hero {
      display: block;
      margin: 0 auto;
      width: 100%;
      height: auto;
      max-width: 600px;
    }

    .copy {
      position: relative;
      margin-top: -16px;
      padding-left: 16px;
      padding-right: 16px;
    }

    .area {
      margin: 0 auto;
      padding: 8px;
      max-width: 360px;
      background: #fff;
      text-align: center;
    }
  }

  footer {
    margin: 2em 0;
    text-align: center;
  }
</style>
