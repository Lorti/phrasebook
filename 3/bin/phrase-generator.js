/* eslint-disable no-cond-assign,no-console,import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const args = process.argv.slice(2);
const source = args[0];
const sets = args.slice(1);

const defaultRegex = /;(.*?):(.*?)\(?''(.*?)''/gm;
const signsRegex = /;(.*?):(.*?)$/gm;
const expressionsRegex = /;(.*?)\s*?''(.*?)''\s*?:\s*?(.*?)$/gm;

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

function parseExpressions(markup, _sets) {
  const phrases = {};
  let matches;

  while ((matches = expressionsRegex.exec(markup)) !== null) {
    if (matches.index === expressionsRegex.lastIndex) {
      expressionsRegex.lastIndex += 1;
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

fs.readFile(path.join(__dirname, source), 'utf-8', (err, data) => {
  if (err) throw err;
  let phrases = parsePhrases(data, sets);
  // if (!Object.keys(phrases).length) {
  //   phrases = parseSigns(data, sets);
  // }
  if (!Object.keys(phrases).length) {
    phrases = parseExpressions(data, sets);
  }
  console.log(JSON.stringify(phrases, null, 2));
});
