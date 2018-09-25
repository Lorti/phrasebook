<template>
  <div v-document-title="`404 Not Found`" v-meta-description="``">
    <h1 class="md-headline">404 Not Found</h1>

    <md-list class="md-double-line">
      <md-list-item>
        <div class="md-list-item-text">
          <template v-if="!$store.state.settings.swapLanguages">
            <span>The requested page could not be found.</span>
            <span>ご指定のページが見つかりませんでした。
            <em>Go shitei no pēji ga mitsukaranakatta.</em></span>
          </template>
          <template v-else>
            <span>ご指定のページが見つかりませんでした。</span>
            <span>Go shitei no pēji ga mitsukaranakatta.
            <em>The requested page could not be found.</em></span>
          </template>
        </div>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'NotFoundComponent',
  mounted() {
    if (window.location.pathname !== '/404') {
      window.location = '/404';
    }
  },
};
</script>

<style scoped>
  .md-list-item-text {
    white-space: normal;
  }
</style>
