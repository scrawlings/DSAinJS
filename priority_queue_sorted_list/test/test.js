var assert = require('assert');
var should = require('should');
var _ = require('lodash');
var Q = require('./../priority_queue_sorted_list').priority_queue_sorted_list;

describe('priority_queue_sorted_list', function() {
  it('should the added items in order from smallest to largest', function() {
    var q = new Q();
    var input = [3,6,5,9];
    var expected = [3,5,6,9];

    input.forEach(function(e){q.add(e);});

    var actual = [];
    for (var x = 0; x < input.length; x++) {
      actual.push(q.take());
    }

    _.zip(expected,actual).forEach(function(pair){assert.equal(pair[0],pair[1]);});
  });

  it('new added items should be subsequently taken in correct order', function() {
    var q = new Q();
    var input1 = [3,6];
    var input2 = [5,4,9];
    var expected = [3,4,5,6,9];

    var actual = [];

    input1.forEach(function(e){q.add(e);});
    actual.push(q.take());

    input2.forEach(function(e){q.add(e);});

    var el;
    while ((el = q.take()) != undefined) {
      actual.push(el);
    }

    _.zip(expected,actual).forEach(function(pair){assert.equal(pair[0],pair[1]);});
  });
});