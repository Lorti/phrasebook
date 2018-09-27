/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const cheerio = require('cheerio');

const index = fs.readFileSync(`${__dirname}/../dist/index.html`, { encoding: 'utf8' });
const snippet = fs.readFileSync(`${__dirname}/../public/shell.html`, { encoding: 'utf8' });

const $ = cheerio.load(index);
$('#app').replaceWith($(snippet));
const shell = $.html();

fs.writeFileSync(`${__dirname}/../dist/shell.html`, shell, 'utf8');
