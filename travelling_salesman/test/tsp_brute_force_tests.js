var assert = require('assert');
var should = require('should');
var _ = require('lodash');
var tsp = require('./../tsp_brute_force.js').tsp_brute_force;


describe('a brain dead travelling salesman solution that enumerates all routes', function() {

	it('returns the shortest route', function() {
		var result = tsp([
			{x: 0, y:0},
			{x: 0, y:100},
			{x: 1, y:100},
			{x: 1, y:0}
		]);

		var expected = [0,1,2,3];

		assert.deepEqual(result.best_tour, expected);
		assert.equal(result.best_distance, 202);
	});

});