var assert = require('assert');
var should = require('should');
var _ = require('lodash');
var sudoku = require('./../sudoku.js').sudoku;

describe("a sudoku solver based on a generic backtracking state space search engine", function() {

	it("should solve an easy puzzle", function() {
		var result = {};
		sudoku(result).execute([
			0,2,0, 3,0,0, 0,1,0, 
			0,0,7, 0,8,6, 3,0,0,
			0,0,0, 5,0,1, 9,0,0,

			0,5,8, 1,7,0, 0,0,3,
			0,4,3, 0,9,0, 1,5,0,
			7,0,0, 0,5,3, 8,9,0,

			0,0,5, 4,0,2, 0,0,0,
			0,0,6, 7,1,0, 4,0,0,
			0,9,0, 0,0,5, 0,3,0 ]);

		assert.deepEqual(result.solution, [
			6,2,9, 3,4,7, 5,1,8,
			5,1,7, 9,8,6, 3,4,2,
			3,8,4, 5,2,1, 9,7,6,

			9,5,8, 1,7,4, 2,6,3,
			2,4,3, 6,9,8, 1,5,7,
			7,6,1, 2,5,3, 8,9,4,

			1,7,5, 4,3,2, 6,8,9,
			8,3,6, 7,1,9, 4,2,5,
			4,9,2, 8,6,5, 7,3,1]);

		assert.equal(result.number_of_moves, 46);
	});
/*
	it("should solve a medium puzzle", function() {
		var result = {};
		sudoku(result).execute([
			9,1,0, 0,0,0, 4,5,0,
		    0,0,0, 9,0,0, 0,3,2,
		    0,0,8, 4,0,0, 0,0,0,

		    0,9,0, 0,8,7, 2,0,0,
		    5,0,3, 0,4,0, 6,0,7,
		    0,0,4, 3,1,0, 0,9,0,

		    0,0,0, 0,0,2, 3,0,0,
		    1,2,0, 0,0,3, 0,0,0,
		    0,3,5, 0,0,0, 0,2,1 ]);

		assert.deepEqual(result.solution, []);
		assert.equal(result.number_of_moves, 0);
	});


	it("should solve a hard puzzle that requires some backtracking", function() {
		var result = {};
		sudoku(result).execute([
			0,4,9, 5,0,0, 0,0,1,
			8,0,7, 0,0,0, 0,6,0,
			0,0,0, 0,8,1, 0,0,0, 

			0,0,0, 0,3,0, 0,0,8,
			0,8,6, 0,2,0, 1,4,0,
			2,0,0, 0,7,0, 0,0,0,

			0,0,0, 6,9,0, 0,0,0,
			0,5,0, 0,0,0, 3,0,6,
			6,0,0, 0,0,3, 4,1,0 ]);

		assert.deepEqual(result.solution, []);
		assert.equal(result.number_of_moves, 0);
	});


	it("should solve a very hard puzzle that requires some backtracking", function() {
		var result = {};
		sudoku(result).execute([
			0,0,4, 0,0,0, 3,0,0,
		    0,8,0, 0,1,0, 0,6,7,
		    0,7,0, 8,0,0, 0,0,0,

		    9,0,7, 1,0,0, 0,0,0,
		    0,0,0, 2,3,7, 0,0,0,
		    0,0,0, 0,0,6, 4,0,1,

		    0,0,0, 0,0,9, 0,8,0,
		    4,6,0, 0,8,0, 0,9,0,
		    0,0,5, 0,0,0, 2,0,0 ]);

		assert.deepEqual(result.solution, []);
		assert.equal(result.number_of_moves, 0);
	});
*/


	it("should solve even the hardest puzzles that requires lots of backtracking", function() {
		var result = {};
		sudoku(result).execute([
			0,0,0, 0,0,0, 0,1,2, 
		    0,0,0, 0,3,5, 0,0,0,
		    0,0,0, 6,0,0, 0,7,0,

		    7,0,0, 0,0,0, 3,0,0,
		    0,0,0, 4,0,0, 8,0,0,
		    1,0,0, 0,0,0, 0,0,0, 

		    0,0,0, 1,2,0, 0,0,0,
		    0,8,0, 0,0,0, 0,4,0,
		    0,5,0, 0,0,0, 6,0,0 ]);

		assert.deepEqual(result.solution, [
		   	6,7,3, 8,9,4, 5,1,2, 
		   	9,1,2, 7,3,5, 4,8,6, 
		   	8,4,5, 6,1,2, 9,7,3, 

			7,9,8, 2,6,1, 3,5,4, 
			5,2,6, 4,7,3, 8,9,1, 
			1,3,4, 5,8,9, 2,6,7,

			4,6,9, 1,2,8, 7,3,5,
			2,8,7, 3,5,6, 1,4,9,
			3,5,1, 9,4,7, 6,2,8]);
		assert.equal(result.number_of_moves, 1243837);
	});	    

});