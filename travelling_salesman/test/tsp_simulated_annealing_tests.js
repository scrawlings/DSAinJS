var assert = require('assert');
var should = require('should');
var _ = require('lodash');
var tsp = require('./../tsp_simulated_annealing.js').tsp_simulated_annealing;
var tsp_utils = require('./../tsp_utils.js').tsp_utils;


describe('a crude but effective travelling salesman solution that uses a basic simulated annealing', function() {

	it('returns the shortest route', function() {
		var result = tsp([
			{x: 0, y:0},
			{x: 0, y:100},
			{x: 1, y:100},
			{x: 1, y:0}
		], tsp_utils.tour_length, 10, 0.99);

		var expected = [0,1,2,3];

		assert.deepEqual(result.best_tour, expected);
		assert.equal(result.best_distance, 202);
	});

});