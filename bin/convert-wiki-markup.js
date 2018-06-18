// https://wikitravel.org/en/Japanese_phrasebook
/* eslint-disable no-cond-assign,no-console */
const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const args = process.argv.slice(2);

function parsePhrases(markup, sets) {
  const regex = /;(.*?):(.*?)''(.*?)''(\s?\(\s?''\s?(.*?)''\s?\)\s?)?/gm;
  const phrases = {};
  let matches;

  while ((matches = regex.exec(markup)) !== null) {
    if (matches.index === regex.lastIndex) {
      regex.lastIndex += 1;
    }

    const id = uuidv4();
    phrases[id] = {
      id: uuidv4(),
      english: matches[1].trim(),
      japanese: matches[2].trim(),
      romaji: matches[3].trim(),
      pronunciation: matches[4] ? matches[5].trim() : null,
      sets,
    };
  }

  return phrases;
}

fs.readFile(path.join(__dirname, '/wiki-markup.txt'), 'utf-8', (err, data) => {
  if (err) throw err;
  const phrases = parsePhrases(data, args);
  console.log(JSON.stringify(phrases, null, 2));
});
