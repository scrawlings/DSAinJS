var _ = require('lodash');
var Backtracker = require('./backtracker.js').StackBacktracker;

module.exports.pathsToNodeFinder = function(target_node, results) {
	return new Backtracker({
		possible_next_moves: function(data, memo, current) {
			return _.difference(data[_.last(current)].e, current);
		},
		possible_result: function(data, memo, current) {
			if (data[_.last(current)].v == target_node) {
				results.push(_.cloneDeep(current));
			}
		},
		initial_selection: function(data, memo) {
			return [0];
		}
	});
};

module.exports.traverser = function(results) {
	return new Backtracker({
		possible_next_moves: function(data, memo, current) {
			return (_(data[_.last(current)].e)
				.map(function(node) {
					return (memo.visited[node]) ? -1 : node;
				})
				.filter(function(node) {
					return node >= 0;
				})
				.each(function(node) {
					memo.visited[node] = true;
				})
				.value());
		},
		push_forward: function(data, memo, current, option) {
			current.push(option);
			return current;
		},
		back_track: function(data, memo, current, option) {
			if (!memo.displayed[_.last(current)]) {
				results.push(_.map(current, function(node) {
					return data[node].v;
				}));
				_.each(current, function(node) {
					memo.displayed[node] = true;
				});
			}

			current.pop();
			return current;
		},
		initial_selection: function(data, memo) {
			memo.visited[0] = true;
			return [0];
		},
		initial_memo: function(data) {
			return {
				visited: new Array(data.length),
				displayed: new Array(data.length)
			};
		}
	});
}; 

