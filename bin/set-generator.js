const uuidv4 = require('uuid/v4');
const slugify = require('slugify');

const uuid = uuidv4();

const args = process.argv.slice(2);
const name = args[0];

console.log(JSON.stringify({
  [uuid]: {
    id: uuid,
    name,
    slug: slugify(name).toLowerCase(),
  },
}, null, 2));
