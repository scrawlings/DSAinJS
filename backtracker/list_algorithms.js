var _ = require('lodash');
var Backtracker = require('./backtracker.js').StackBacktracker;

module.exports.permutations = function(results) {
	return new Backtracker({
		possible_next_moves: function(data, memo, current) {
			return _.difference(data, current);
		},
		possible_result: function(data, memo, current) {
			if (current.length == data.length) {
				results.push(_.cloneDeep(current));
			}
		}
	});
};

module.exports.combinations = function(results) {
	return new Backtracker({
		possible_next_moves: function(data, memo, current) {
			return _.rest(data, _(current).map(function(option) {
				return _.indexOf(data, option)
			}).max().value() + 1);
		},
		possible_result: function(data, memo, current) {
			if (current.length <= data.length) {
				results.push(_.cloneDeep(current));
			}
		}
	});
}
