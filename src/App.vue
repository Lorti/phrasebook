<template>
  <md-app :md-scrollbar="false">
    <md-app-toolbar class="md-primary">
      <router-link class="toolbar-container" to="/">
        <img class="toolbar-logo" src="./assets/logo.svg" alt="Logo">
        <span class="toolbar-title md-title"><span>Japanese</span> Phrasebook</span>
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
        <md-list-item href="https://manu.ninja/introducing-japanese-phrasebook">
          <md-icon>info</md-icon>
          <span class="md-list-item-text">About “Japanese Phrasebook”…</span>
        </md-list-item>
        <md-list-item>
          <span class="md-list-item-text">© {{ (new Date()).getFullYear() }} Manuel Wieser</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

    <md-app-content>
      <Header/>
      <router-view/>
      <Footer/>
    </md-app-content>
  </md-app>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
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
        this.$store.dispatch('TOGGLE_SETTING_SWAP_LANGUAGES', value);
      },
    },
  },
};
</script>

<style lang="scss">
  @import "styles/vue-material";
  @import "styles/fonts";

  a {
    color: inherit;
    text-decoration: none !important;
  }

  .md-app {
    min-height: 100vh;
  }

  .toolbar-container {
    display: flex;
    align-items: center;

    .toolbar-logo {
      margin: 0 8px;
      height: 32px !important;
      width: 32px !important;
    }

    .toolbar-title {
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
  }
</style>
