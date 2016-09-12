const objDiff = require('./objDiff');

function C() {}

const data1 = {
  "foo": undefined,
  "bar": [],
  "id": "57d2a554ffd400fa9603e2db",
  "name": {
    "first": "Noble",
    "last": "Oneal"
  },
  "company": "GEEKOL",
  "email": "noble.oneal@geekol.org",
  "tags": ["adipisicing", "qui", "incididunt", "est", "eiusmod"],
  "friends": [
    {
      "id": 0,
      "name": "White Finley"
    },
    {
      "id": 1,
      "name": "Florence Jenkins"
    },
    {
      "id": 2,
      "name": "Carole Huffman"
    }
  ]
};
const data2 = {
  "bar": {},
  "id": "57d2a554ffd400fa9603e2db",
  "name": {
    "first": "Haam",
    "last": "Oneal"
  },
  "company": "GEEKOL",
  "email": "noble.oneal@geekol.org",
  "tags": ["adipisicing", "qui", "incididunt", "est", "eiusmod"],
  "friends": [
    {
      "id": 0,
      "name": "White Finley"
    },
    {
      "id": 1,
      "name": "John Foo"
    },
    {
      "id": 2,
      "name": "Carole Huffman"
    }
  ]
};

const diff = objDiff(data1, data2);
Object.keys(diff).forEach(key => {
  console.log(key + ': ' + diff[key].obj1 + ' !== ' + diff[key].obj2);
});