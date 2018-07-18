/* eslint-disable no-cond-assign,no-console */
const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const args = process.argv.slice(2);
const source = args[0];
const sets = args.slice(1);

const defaultRegex = /;(.*?):(.*?)\(?''(.*?)''/gm;
const countryRegex = /;(.*?)\s*?''(.*?)''\s*?:\s*?(.*?)$/gm;
const signsRegex = /;(.*?):(.*?)$/gm;

function parsePhrases(markup, _sets) {
  const phrases = {};
  let matches;

  while ((matches = defaultRegex.exec(markup)) !== null) {
    if (matches.index === defaultRegex.lastIndex) {
      defaultRegex.lastIndex += 1;
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

function parseCountries(markup, _sets) {
  const phrases = {};
  let matches;

  while ((matches = countryRegex.exec(markup)) !== null) {
    if (matches.index === countryRegex.lastIndex) {
      countryRegex.lastIndex += 1;
    }

    const id = uuidv4();
    phrases[id] = {
      id: uuidv4(),
      english: matches[3].trim(),
      japanese: matches[1].trim(),
      romaji: matches[2].trim(),
      sets: _sets,
    };
  }

  return phrases;
}

function parseSigns(markup, _sets) {
  const phrases = {};
  let matches;

  while ((matches = signsRegex.exec(markup)) !== null) {
    if (matches.index === signsRegex.lastIndex) {
      signsRegex.lastIndex += 1;
    }

    const id = uuidv4();
    phrases[id] = {
      id: uuidv4(),
      english: matches[2].trim(),
      japanese: matches[1].trim(),
      sets: _sets,
    };
  }

  return phrases;
}

fs.readFile(path.join(__dirname, source), 'utf-8', (err, data) => {
  if (err) throw err;
  const phrases = Object.assign({},
    parsePhrases(data, sets),
    parseCountries(data, sets),
    parseSigns(data, sets)
  );
  console.log(JSON.stringify(phrases, null, 2));
});
