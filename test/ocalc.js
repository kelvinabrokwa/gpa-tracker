'use strict';

/**
 * hit me up at kelvinabrokwa@gmail.com for the formula
 * to be honest I don't even know how to begin commenting...
 * fucking sorry, okay?
 */

var calculator = module.exports = function(obj) {
  var target = obj.target;
  var input = obj.input;
  for (var key in input) {
    if (input[key].weight) {
      input[key].weight = parseFloat(input[key].weight);
      if (input[key].grades) {
        if (input[key].grades.split('').pop() === ',') {
          var g = input[key].grades;
          input[key].grades = g.substring(0, g.length - 1);
        }
        var grades = input[key].grades.split(',').map(parseFloat);
        input[key].grades_arr = grades;
        input[key].average = grades.reduce(function(a, b) { return a + b; }) / grades.length;
      } else {
        input[key].average = null;
      }
    }
  }
  var used = Object.keys(input).filter(function(cat) { return input[cat].average; });
  var agg_weight = 0;
  var other_count;
  for (var i in used) { agg_weight += input[used[i]].weight; }
  for (key in input) {
    if ((input[key].average) && (input[key].weight)) {
      // there are grades in this category
      other_count = 0;
      for (var other in input) {
        if ( (other !== key) && (input[other].average) && (input[other].weight) ) {
          other_count += (input[other].average * (input[other].weight / agg_weight));
        }
      }

      console.log(key, 'other count:', other_count)

      input[key].needed = (
                            (target - other_count) * 
                            (agg_weight * (input[key].grades_arr.length + 1)) / 
                            input[key].weight ) - (input[key].average * 
                            (input[key].grades_arr.length)
                          );
      input[key].needed = Math.round(input[key].needed * 100) / 100
    } else if (input[key].weight) {
      // there have been no grades in this category
      agg_weight += input[key].weight
      other_count = 0;
      for (var other in input) {
        if ( (other !== key) && (input[other].average) && (input[other].weight) ) {
          other_count += (input[other].average * (input[other].weight / agg_weight));
        }
      }

      console.log(key, 'other count:', other_count)

      input[key].needed = (
                            (target - other_count) *
                            (agg_weight / input[key].weight)
                          );
      input[key].needed = Math.round(input[key].needed * 100) / 100
    }
  }
  obj.input = input;
  return obj;
};



var data = {
  target: 100,
  input: {
    hw: {
      weight: 0.3,
      grades: '100,90'
    },
    quiz: {
      weight: 0.3,
      grades: '100'
    },
    test: {
      weight: 0.4,
      grades: ''
    }
  }
};

var r = calculator(data)
console.log(JSON.stringify(r, null, 2))
