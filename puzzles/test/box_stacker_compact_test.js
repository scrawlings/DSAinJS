var _ = require('lodash');
var util = require('util');
var assert = require('assert');
var should = require('should');

var box_stacker = require('./../box_stacker_compact').box_stacker;
var box_generator = require('./../box_stacker').box_generator;


describe('box stacker', function() {
	it('it should find the tallest legal stack', function() {
		var start = +new Date();

		var box_count = 10000;  // can manage another order of magnitude
		var box_max_dimension = 10;
		var boxes = box_generator(box_count, box_max_dimension);

		var stack = box_stacker(boxes);

		util.puts('stack length: '+stack.length);
		_(stack).forEach(function(box) {
			util.puts("{"+box.key+', '+box.h.toFixed(2)+','+box.w.toFixed(2)+','+box.b.toFixed(2)+
				', h:'+box.smaller_height+((box.best_smaller)?(', n:'+box.best_smaller):'')+'}');
		});

	    var end = +new Date();
	    util.puts("execution time, Int32Array based association list: " + (end - start));
	});
});	