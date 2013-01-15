var assert = require('assert');
var should = require('should');
var _ = require('lodash');
var QH = require('./../priority_queue_heap').priority_queue_heap;
var QSL = require('./../priority_queue_sorted_list').priority_queue_sorted_list;
var util = require('util');

describe('comparing priority queue implementations', function() {
  it('they should produce the same results', function() {
    var data_set = {};
    data_set.initial = (_(_.range(1000))
                        .map( function() { return (Math.random()*100)>>0; } )
                        .value());

    util.puts(data_set.initial+"\n");

    data_set.batches = (_(_.range(1000))
                        .map( function() { 
                          return (_(_.range(100))
                                  .map( function() { return (Math.random()*100)>>0; } )
                                  .value());
                        } )
                        .value());

    var qh = new QH(data_set.initial);
    var qsl = new QSL(data_set.initial); 

    var results = { qh: [], qsl: [] };

    _.forEach(data_set.batches, function(batch) {
      _.forEach(batch, function(el) {
        qh.add(el);
        qsl.add(el);
      })
      _.forEach(_.range(batch.length), function() { 
        results.qh.push(qh.take());
        results.qsl.push(qsl.take());
      });
    })

    
    assert.deepEqual(results.qh,results.qsl);
    
  });

});