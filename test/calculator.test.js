var test = require('tape'),
    calculate = require('../src/calculator');

var data = {
  target: 100,
  cats: [
    {
      name: 'hw',
      weight: 0.3,
      grades: [100,90]
    },
    {
      name: 'quiz',
      weight: 0.3,
      grades: [100]
    },
    {
      name: 'test',
      weight: 0.4,
      grades: []
    }
  ]
};

var results = {
  hw: 110,
  quiz: 110,
  test: 103.75
};

test('calculator', (t) => {
  var _data = data
  t.equal(calculate(_data), results);
  t.equal(_data, data); // check for mutation
  t.end()
});
