// eslint-disable-next-line import/no-extraneous-dependencies
const SitemapGenerator = require('sitemap-generator');

const generator = SitemapGenerator('https://www.japanese-phrasebook.com/', {
  filepath: `${__dirname}/../publuc/sitemap.xml`,
  lastMod: true,
  stripQuerystring: true,
});

generator.start();
