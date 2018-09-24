const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../dist/index.html`, { encoding: 'utf8' });
const snippet = fs.readFileSync(`${__dirname}/../public/shell.html`, { encoding: 'utf8' });

const search = /<body>([^]*)<\/body>/;
const shell = index.replace(search, snippet);

fs.writeFileSync(`${__dirname}/../dist/shell.html`, shell, 'utf8');
