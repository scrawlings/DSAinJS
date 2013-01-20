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

function addToTypedArray(array, used, value) {
	if (array.length == used) {
		var new_array = new Int32Array(array.length*2);
		new_array.set(array);
		array = new_array
	}
	array[used] = value;
	return array;
}

module.exports.box_stacker = function(boxes) {
	function compare_boxes(b1, b2) {
		if (b1.h < b2.h && b1.w < b2.w && b1.b < b2.b) return -1;
		if (b1.h > b2.h && b1.w > b2.w && b1.b > b2.b) return 1;
		return undefined;
	};

	for (var i = 0; i < boxes.length; i++) {
		boxes[i].key = i;
		boxes[i].best_smaller = undefined;
		boxes[i].smaller_height = 0;
		boxes[i].smaller_than = 0;
		boxes[i].larger_than = new Int32Array(1);
		boxes[i].larger_than_total = 0;
	}

	for (var i = 0; i < boxes.length - 1; i++) {
		for (var j = i+1; j < boxes.length; j++) {
			var diff = compare_boxes(boxes[i], boxes[j]);
			if (diff < 0) {
				boxes[i].smaller_than++;
				boxes[j].larger_than = addToTypedArray(boxes[j].larger_than, boxes[j].larger_than_total, i);
				boxes[j].larger_than_total++;
			} else if (diff > 0) {
				boxes[i].larger_than = addToTypedArray(boxes[i].larger_than, boxes[i].larger_than_total, j);
				boxes[i].larger_than_total++;
				boxes[j].smaller_than++;
			}
		}
	}

	var largest_boxes = [];
	for (var i = 0; i < boxes.length; i++) {
		if (boxes[i].smaller_than == 0) {
			largest_boxes.push(i)
		}
	}

	function find_longest(base_box) {
		if (base_box.best_smaller) {
			return base_box.smaller_height;
		}

		var possible_next_boxes = base_box.larger_than;
		var best_smaller = undefined;
		for (var i = 0; i < base_box.larger_than_total; i++) {
			var smaller_height = find_longest(boxes[possible_next_boxes[i]]);
			if (!best_smaller || (boxes[best_smaller].smaller_height <= smaller_height)) {
				best_smaller = possible_next_boxes[i];
			}
		}

		if (best_smaller) {
			base_box.best_smaller = best_smaller;
			base_box.smaller_height = boxes[best_smaller].smaller_height + 1;
		}
		return base_box.smaller_height;
	}

	var longest_stack = 0;
	var longest_base = 0;
	for (var i = 0; i < largest_boxes.length; i++) {
		var long_stack = find_longest(boxes[largest_boxes[i]]);
		if (long_stack > longest_stack) {
			longest_stack = long_stack;
			longest_base = largest_boxes[i];
		}
	}

	var box = boxes[longest_base];
	var stack = [box];
	while (box.best_smaller) {
		stack.push(boxes[box.best_smaller]);
		box = boxes[box.best_smaller];
	}

	return stack;
};