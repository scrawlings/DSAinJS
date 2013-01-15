var assert = require('assert');
var should = require('should');
var _ = require('lodash');
var Q = require('./../priority_queue_heap').priority_queue_heap;
var util = require('util');

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
    var input1 = [3,6];
    var input2 = [5,4,9];

    var q = new Q(input1);

    var expected = [3,4,5,6,9];

    var actual = [];

    actual.push(q.take());

    input2.forEach(function(e){q.add(e);});

    var el;
    while ((el = q.take()) != undefined) {
      actual.push(el);
    }

    _.zip(expected,actual).forEach(function(pair){assert.equal(pair[0],pair[1]);});
  });

  it('should produce sorted tranches of items', function() {

    var q = new Q(_(_.range(10000)).map(function(){ return (Math.random()*100)>>0; }).value());
    for (var i = 0; i < 1000; i++) {
      var result = [];
      for (var j = 0; j < 100; j++) {
        q.add((Math.random()*100)>>0);
      }
      for (var k = 0; k < 100; k++) {
        result.push(q.take());
      }
      for (var l = 0; l < (result.length - 1); l++) {
        assert(result[l] <= result[l+1]);
      }
    }
  });

});