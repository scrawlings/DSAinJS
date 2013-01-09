var _ = require('lodash');

module.exports.Backtracker = (function() {
	function Backtracker(controls) {
		this.possible_next_moves = controls.possible_next_moves || function() {};
		this.possible_result     = controls.possible_result     || function() {};
		this.push_forward        = controls.push_forward        || function() {};
		this.back_track          = controls.back_track          || function() {};
		this.initial_selection   = controls.initial_selection   || function() {};
		this.initial_memo        = controls.initial_memo        || function() {};
		this.short_curcuit		 = controls.short_curcuit       || function() { return false; };
	}

	Backtracker.prototype.execute = function(data) {
		var memo = this.initial_memo(data);
		var init = this.initial_selection(data, memo)

		this.ex(data, memo, init);
	}

	Backtracker.prototype.ex = function(data, memo, current) {
		var that = this;
		_.forEach(this.possible_next_moves(data, memo, current), function(option) {
			current = that.push_forward(data, memo, current, option);
			that.possible_result(data, memo, current);
			if (that.short_curcuit(data, memo, current)) {
				return false;
			}
			that.ex(data, memo, current);
			current = that.back_track(data, memo, current, option);
		});
	}

	return Backtracker;
}());


module.exports.StackBacktracker = (function() {
	function StackBacktracker(controls) {
		this.possible_next_moves = controls.possible_next_moves || function() {};
		this.possible_result     = controls.possible_result     || function() {};
		this.short_curcuit		 = controls.short_curcuit       || function() { return false; };
		this.initial_selection   = controls.initial_selection   || function() { return []; };
		this.initial_memo        = controls.initial_memo        || function() { return {} };
		this.push_forward        = controls.push_forward        || function(data, memo, current, option) {
																		current.push(option);
																		return current;
																	};
		this.back_track          = controls.back_track          || function(data, memo, current, option) {
																		current.pop();
																		return current;
																	};
	}

	StackBacktracker.prototype = new module.exports.Backtracker({});

	return StackBacktracker;
}());