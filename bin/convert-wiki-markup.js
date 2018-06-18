/* eslint-disable no-cond-assign,no-console */
const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const args = process.argv.slice(2);
const source = args[0];
const sets = args.slice(1);

function parsePhrases(markup, _sets) {
  const regex = /;(.*?):(.*?)\(?''(.*?)''/gm;
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
      sets: _sets,
    };
  }

  return phrases;
}

fs.readFile(path.join(__dirname, source), 'utf-8', (err, data) => {
  if (err) throw err;
  const phrases = parsePhrases(data, sets);
  console.log(JSON.stringify(phrases, null, 2));
});
