var assert = require('assert');
var should = require('should');
var _ = require('lodash');
var permutations = require('./../list_algorithms.js').permutations;
var combinations = require('./../list_algorithms.js').combinations;


describe('list algorithms using the generic backtracker', function() {

	it('all permutations', function() {
		var results = [];

		permutations(results).execute(['a','b','c'])

		var expecting = [
			['a','b','c'],
			['a','c','b'],
			['b','a','c'],
			['b','c','a'],
			['c','a','b'],
			['c','b','a'],
		];

		assert.deepEqual(results, expecting);
	});

	it('all combinations', function() {
		var results = [];

		combinations(results).execute(['a','b','c'])

		var expecting = [
			['a',],
			['a','b'],
			['a','b','c'],
			['a','c'],
			['b'],
			['b','c'],
			['c'],
		];

		assert.deepEqual(results, expecting);
	});

});