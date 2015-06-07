/**
 * Given an object return another object with ids in that first object
 * mapped to grades needed
 * @param {object} data - the data object with keys `target` and `cats`
 * `target` is an int that represents the target overall gpa
 * `cats` is an array of objects with keys `id`, `weight`, and `grades`
 */

var calculator = module.exports = (data) => {
  try {
    data.cats.filter(cat => cat.weight && cat.grades.length)
      .reduce((prev, curr) => prev.weight + curr.weight); 
  } catch (e) {
    console.log('-')
    console.log(e)
    return 100;
  }
  var { target, cats } = data;
  cats = cats.filter(cat => cat.weight).map(cat => {
    cat.average = cat.grades.length ?
      cat.grades.reduce((p,c) => p + c) / cat.grades.length :
      null;
    return cat;
  })
  var agg_weight = cats
    .filter(cat => cat.weight && cat.average)
    .reduce((prev, curr) => prev.weight + curr.weight);
  return cats.reduce((out, cat, i, _cats) => {
    if (cat.average) {
      var other_count = _cats
        .filter(c => c.id !== cat.id)
        .reduce((count, c) => {
          count += c.average * (c.weight / agg_weight);
          return count;
        }, 0);
      out[cat.id] = 
        ( (target - other_count) * ((agg_weight * (cat.grades.length + 1)) / cat.weight) ) -
        ( cat.average * cat.grades.length );
    } else {
      agg_weight += cat.weight;
      var other_count = _cats
        .filter(c => c.id !== cat.id)
        .reduce((count, c) => {
          count += c.average * (c.weight / agg_weight);
          return count;
        }, 0);
      out[cat.id] = (target - other_count) * (agg_weight / cat.weight);
    }
    return out;
  }, {});
}

var data = {
  target: "59",
  cats: [
    {
      "name": "quiz",
      "weight": 1,
      "grades": [
        100,
        90
      ],
      "id": "c12bfc1d-779a-c588-3157-33ba237f08cd"
    }
  ]
}

console.log(calculator(data));
