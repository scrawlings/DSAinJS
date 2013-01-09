var assert = require('assert');
var should = require('should');
var _ = require('lodash');

var pathsToNodeFinder = require('./../graph_algorithms.js').pathsToNodeFinder;
var traverser = require('./../graph_algorithms.js').traverser;

describe('graphs algorithms using the generic backtracker', function() {
	
	it('should find a set of traversals that covers every node in a tree', function() {
		var results = [];
		traverser(results).execute([
			{v:"a", e:[1,4]}, 
			{v:"b", e:[2,3]}, 
			{v:"c", e:[]}, 
			{v:"d", e:[]}, 
			{v:"e", e:[5,6]}, 
			{v:"f", e:[]}, 
			{v:"g", e:[]}, ]);

		var expected = [
			["a","b","c"],
			["a","b","d"],
			["a","e","f"],
			["a","e","g"]
		];
		assert.deepEqual(results, expected);
	});
	

	it('should find a set of traversals that covers every node in a graph with loops', function() {
		var results = [];
		traverser(results).execute([
			{v:"a", e:[1, 2]}, 
			{v:"b", e:[3]}, 
			{v:"c", e:[5, 0, 6]}, 
			{v:"d", e:[4, 3]}, 
			{v:"e", e:[1, 5]}, 
			{v:"f", e:[6]}, 
			{v:"g", e:[]}, ]);
		
		var expected = [
			["a","b","d","e","f","g"],
			["a","c"]
		];
		assert.deepEqual(results, expected);
	});


	it('should find all paths to a given node', function() {
		var results = [];

		var all_paths = pathsToNodeFinder('g', results);

		all_paths.execute([
			{v:"a", e:[1, 2]}, 
			{v:"b", e:[3]}, 
			{v:"c", e:[5, 0, 6]}, 
			{v:"d", e:[4, 3]}, 
			{v:"e", e:[1, 5]}, 
			{v:"f", e:[6]}, 
			{v:"g", e:[]}, ]);

        var expected = [
        	[0,1,3,4,5,6],
        	[0,2,5,6],
        	[0,2,6]
        ]

		assert.deepEqual(results, expected);
	});
	
});