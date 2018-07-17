const SitemapGenerator = require('sitemap-generator');

const generator = SitemapGenerator('https://www.japanese-phrasebook.com/', {
  filepath: `${__dirname}/../sitemap.xml`,
  stripQuerystring: true,
});

generator.start();
