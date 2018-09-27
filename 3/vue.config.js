/* eslint-disable no-param-reassign,import/no-extraneous-dependencies */
const path = require('path');
const cheerio = require('cheerio');

const PrerenderSPAPlugin = require('prerender-spa-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { sets } = require('./public/data/default.json');

const allSubsets = [...Object.values(sets)]
  .reduce((subsets, set) => subsets.concat(set.subsets), []);
const allSets = [...Object.values(sets)]
  .filter(set => !allSubsets.includes(set.id));

module.exports = {
  // https://cli.vuejs.org/guide/webpack.html
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== 'production') {
      return {};
    }
    return {
      plugins: [
        // https://github.com/chrisvfritz/prerender-spa-plugin
        new PrerenderSPAPlugin({
          staticDir: config.output.path,
          routes: ['/', '/404', ...allSets.map(set => `/sets/${set.id}/${set.slug}`)],
          renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
            renderAfterDocumentEvent: 'rendered',
          }),
          postProcess(context) {
            if (context.route === '/404') {
              context.outputPath = path.join(config.output.path, '/404.html');
            }
            const $ = cheerio.load(context.html);
            $('[src*="https://www.google-analytics.com/analytics.js"]').remove();
            context.html = $.html();
            return context;
          },
        }),
        // https://github.com/webpack-contrib/copy-webpack-plugin
        new CopyWebpackPlugin([
          {
            from: 'public/manifest.json',
            to: 'manifest.webmanifest',
          },
        ]),
      ],
    };
  },
  // https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-pwa
  pwa: {
    name: 'Japanese Phrasebook',
    themeColor: '#f44336',
    msTileColor: '#f44336',
    favicon32: 'img/icons/favicon-32x32.png',
    favicon16: 'img/icons/favicon-16x16.png',
    appleTouchIcon: 'img/icons/apple-touch-icon.png',
    maskIcon: 'img/icons/safari-pinned-tab.svg',
    msTileImage: 'img/icons/mstile-144x144.png',
    workboxOptions: {
      cacheId: 'phrasebook',
      importWorkboxFrom: 'local',
      navigateFallback: 'shell.html',
      navigateFallbackWhitelist: [/^((?!\/404).)*$/],
    },
  },
};
