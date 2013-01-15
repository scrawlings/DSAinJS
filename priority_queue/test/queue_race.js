var assert = require('assert');
var should = require('should');
var _ = require('lodash');
var QH = require('./../priority_queue_heap').priority_queue_heap;
var QL = require('./../priority_queue_sorted_list').priority_queue_sorted_list;
var util = require('util');

function queue_driver(Q, initial, batches, batch_size) {
	var start = +new Date();
    var q = new Q(_(_.range(initial)).map(function(){ return (Math.random()*100)>>0; }).value());

    for (var i = 0; i < batches; i++) {
	    var result = [];
	    for (var j = 0; j < batch_size; j++) {
	        q.add((Math.random()*100)>>0);
	    }
	    for (var k = 0; k < batch_size; k++) {
	        result.push(q.take());
	    }
    }
    var end = +new Date();

    return end - start;
}

describe('priority_queue_sorted_list', function() {
    it('should show some cross over that makes the heap better than the list', function() {
    	var heap_time = queue_driver(QH, 1000, 1000, 1000);
    	var list_time = queue_driver(QL, 1000, 1000, 1000);

    	util.puts("heap time: "+heap_time);
    	util.puts("list time: "+list_time);

    	assert(heap_time < list_time);
    });
});