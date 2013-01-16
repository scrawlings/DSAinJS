var _ = require('lodash');
var util = require('util');

module.exports.priority_queue_heap = (function() {

	function PriorityQueue(initial) {
		if (!!initial) {
			this.heap = initial.slice(0);
			this.heapify();
		} else {
			this.heap = [];
		}
	}

	PriorityQueue.prototype.heapify = function() {
		var last = this.heap.length - 1;
		var mid = (this.heap.length / 2)>>0;
		for (var n = (this.heap.length - 1); n >= 0 ; n--) {
			this.bubble_up(n);
		}
	}

	PriorityQueue.prototype.add = function(item) {
		this.heap.push(item);
		this.bubble_up(this.heap.length - 1);
	}

	PriorityQueue.prototype.bubble_up = function(child_index) {
		var parent_index = this.parent_index(child_index);
		if (this.heap[parent_index] > this.heap[child_index]) {
			this.bubble_down(parent_index);
		}
		if (parent_index > 0) {
			this.bubble_up(parent_index);
		}
	}

	PriorityQueue.prototype.parent_index = function(child_index) {
		return (((child_index + 1) / 2)>>0) - 1;
	}

	PriorityQueue.prototype.right_child = function(parent_index) {
		return (parent_index + 1) * 2;
	}

	PriorityQueue.prototype.left_child = function(parent_index) {
		return this.right_child(parent_index) - 1;
	}

	PriorityQueue.prototype.bubble_down = function(odd_ball) {
		var left_index = this.left_child(odd_ball);
		var right_index = this.right_child(odd_ball);
		var left = undefined;
		var right = undefined;
		
		var item = this.heap[odd_ball];
		var index = undefined;

	
		if (left_index < this.heap.length) {
			left = this.heap[left_index];
		}
		if (right_index < this.heap.length) {
			right = this.heap[right_index];
		}

		if (item > right && left > right) {
			index = right_index;
		} else if (item > left) {
			index = left_index;
		}

		if (index) {
			var temp = this.heap[odd_ball];
			this.heap[odd_ball] = this.heap[index];
			this.heap[index] = temp;

			this.bubble_down(index);
		}
	}

	PriorityQueue.prototype.take = function() {
		if (this.heap.length > 0) {
			var item = this.heap[0];
			if (this.heap.length > 1) {
				this.heap[0] = this.heap.pop();
				this.bubble_down(0);
			} else {
				this.heap = [];
			}
			return item;
		}
	}

	return PriorityQueue;
}());