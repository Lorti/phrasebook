const SitemapGenerator = require('sitemap-generator');

const generator = SitemapGenerator('https://www.japanese-phrasebook.com/', {
  filepath: `${__dirname}/../root/sitemap.xml`,
  lastMod: true,
  stripQuerystring: true,
});

generator.start();
