var _ = require('lodash');
var util = require('util');

module.exports.box_generator = function(box_count, box_max_dimension) {
	var boxes = [];
	for (var i = 0; i < box_count; i++) {
		boxes.push({
			w: Math.random() * box_max_dimension,
			b: Math.random() * box_max_dimension,
			h: Math.random() * box_max_dimension
		});
	}

	return boxes;
};

module.exports.box_stacker = function(boxes) {
	function compare_boxes(b1, b2) {
		if (b1.h < b2.h && b1.w < b2.w && b1.b < b2.b) return -1;
		if (b1.h > b2.h && b1.w > b2.w && b1.b > b2.b) return 1;
		return undefined;
	};

	for (var i = 0; i < boxes.length; i++) {
		boxes[i].key = i;
		boxes[i].smaller_than = [];
		boxes[i].larger_than = [];
	}

	for (var i = 0; i < boxes.length - 1; i++) {
		for (var j = i+1; j < boxes.length; j++) {
			var diff = compare_boxes(boxes[i], boxes[j]);
			if (diff < 0) {
				boxes[i].smaller_than.push(boxes[j]);
				boxes[j].larger_than.push(boxes[i]);
			} else if (diff > 0) {
				boxes[i].larger_than.push(boxes[j]);
				boxes[j].smaller_than.push(boxes[i]);
			}
		}
	}

	var largest_boxes = [];
	for (var i = 0; i < boxes.length; i++) {
		if (boxes[i].smaller_than.length == 0) {
			largest_boxes.push(boxes[i])
		}
	}

	var find_longest_memo = {};
	function find_longest(base_box) {
		if (find_longest_memo[base_box.key]) {
			return find_longest_memo[base_box.key];
		}

		var possible_next_boxes = base_box.larger_than;
		var longest_stack = [];
		for (var i = 0; i < possible_next_boxes.length; i++) {
			var long_stack = find_longest(possible_next_boxes[i]);
			if (long_stack.length > longest_stack.length) {
				longest_stack = long_stack;
			}
		}

		find_longest_memo[base_box.key] = [base_box].concat(longest_stack);
		return find_longest_memo[base_box.key];
	//	return [base_box].concat(longest_stack);;
	}

	var longest_stack = [boxes[0]];
	for (var i = 0; i < largest_boxes.length; i++) {
		var long_stack = find_longest(largest_boxes[i]);
		if (long_stack.length > longest_stack.length) {
			longest_stack = long_stack;
		}
	}

	return longest_stack;
};