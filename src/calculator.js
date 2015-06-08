
/**
 * Given an object return another object with ids in that first object
 * mapped to grades needed
 * @param {object} data - the data object with keys `target` and `cats`
 * `target` is an int that represents the target overall gpa
 * `cats` is an array of objects with keys `id`, `weight`, and `grades`
 */

var calculator = (data) => {
  try {
    data.cats.filter(cat => cat.weight && cat.grades.length)
      .map(c => c.weight)
      .reduce((prev, curr) => prev + curr);
  } catch (e) {
    return {};
  }
  var { target } = data;
  var cats = data.cats.filter(cat => cat.weight).map(cat => {
    cat.average = cat.grades.length ?
      cat.grades.reduce((p, c) => p + c) / cat.grades.length : null;
    return cat;
  });
  var aggWeight = cats
    .filter(cat => cat.weight && cat.average)
    .map(cat => cat.weight)
    .reduce((prev, curr) => prev + curr);
  return cats.reduce((out, cat, i, _cats) => {
    var otherCount;
    if (cat.average) {
      otherCount = _cats
        .filter(c => c.id !== cat.id)
        .reduce((count, c) => {
          count += c.average * (c.weight / aggWeight);
          return count;
        }, 0);
      out[cat.id] =
        ( (target - otherCount) * ((aggWeight * (cat.grades.length + 1)) / cat.weight) ) -
        ( cat.average * cat.grades.length );
    } else {
      aggWeight += cat.weight;
      otherCount = _cats
        .filter(c => c.id !== cat.id)
        .reduce((count, c) => {
          count += c.average * (c.weight / aggWeight);
          return count;
        }, 0);
      out[cat.id] = (target - otherCount) * (aggWeight / cat.weight);
    }
    return out;
  }, {});
};

module.exports = calculator;
