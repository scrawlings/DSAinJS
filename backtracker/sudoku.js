var _ = require('lodash');
var Backtracker = require('./backtracker.js').StackBacktracker;

module.exports.sudoku = function(result) {
	var all = [1,2,3,4,5,6,7,8,9];
	return new Backtracker({
		possible_next_moves: function(data, memo, current) {
			var previous = _.last(current); 
			var possibilities = (_(memo.offsets)
				.map(function(offsets, cell) {
					if (previous[cell] > 0) {
						return all;
					} else {
						return (_(offsets)
							.map(function(offset) {
								return previous[offset];
							})
							.filter(function(x) { return x > 0; })
							.uniq()
							.value());
					}
				})
				.map(function(taken) {
					return _.difference(all, taken);
				})
				.map(function(allowed, cell) {
					return {
						cell: cell,
						moves: allowed
					};
				})
				.filter(function(options) {
					return options.moves.length > 0;
				})
				.sortBy(function(options) {

					return options.moves.length;
				})
				.value());

			var run_with_this = _.first(possibilities)
			if (!!run_with_this) {
				var next_frames = _.map(run_with_this.moves, function(option) {
					var base = previous.slice(0);	
					base[run_with_this.cell] = option;
					return base;	
				});	
				return next_frames;
			} else {
				return [];
			}

		},
		short_curcuit: function(data, memo, current) {
			return memo.solved;
		},
		possible_result: function(data, memo, current) {
			memo.number_of_moves++;
			if (! _.contains(_.last(current), 0)) {
				memo.solved = true;

				result.number_of_moves = memo.number_of_moves;
				result.solution = _.last(current);
				result.moves = [];
				_.each(current, function(move) {
					result.moves.push(move);
				});
			}
		},
		push_forward: function(data, memo, current, option) {
			current.push(option);
			return current;
		},
		back_track: function(data, memo, current, option) {
			current.pop();
			return current;
		},
		initial_selection: function(data, memo) {
			return [data];
		},
		initial_memo: function(data) {
			var offsets = (_(_.range(9*9))
				.map(function(cell) {
					var row = cell / 9 >> 0;
					var col = cell % 9;

					var row_offsets = (_(_.range(9))
						.map(function(cell) {
							return cell + (row * 9);
						})
						.value());
					var col_offsets = (_(_.range(9))
						.map(function(cell) {
							return col + (9 * cell);
						})
						.value());

					var bloc_row = row / 3 >> 0;
					var bloc_col = col / 3 >> 0;
					var bloc_0 = (bloc_row * 3 * 9) + (bloc_col * 3);

					var bloc_offsets = (_([0,1,2, 9,10,11, 18,19,20])
						.map(function(cell) {
							return bloc_0 + cell;
						})
						.value());

					return _.union(row_offsets, col_offsets, bloc_offsets);
				})
				.value());

			return {
				offsets: offsets,
				solved: false,
				number_of_moves: 0
			};
		}
	});

};