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
		for (var n = this.heap.length; n >= 0 ; n--) {
			this.bubble_up(n);
		}
	}

	PriorityQueue.prototype.add = function(item) {
		this.heap.push(item);
		this.bubble_up(this.heap.length - 1);
	}

	PriorityQueue.prototype.bubble_up = function(child_index) {
		var parent_index = this.parent_index();
		if (this.heap[parent_index] >= this.heap[child_index]) {
			var temp = this.heap[parent_index];
			this.heap[parent_index] = this.heap[child_index];
			this.heap[child_index] = temp;
		}
		if (parent_index > 0) {
			this.bubble_up(parent_index);
		}
	}

	PriorityQueue.prototype.parent_index = function(child_index) {
		return (child_index / 2)>>0;
	}

	PriorityQueue.prototype.right_child = function(parent_index) {
		return (parent_index + 1) * 2;
	}

	PriorityQueue.prototype.left_child = function(parent_index) {
		return this.right_child(parent_index) - 1;
	}

	PriorityQueue.prototype.bubble_down = function(odd_ball) {
		var left = this.left_child(odd_ball);
		var right = this.right_child(odd_ball);

		if (
			right < this.heap.length // still in the heap
			&&
			this.heap[left] > this.heap[right] // right side is the small side and we prefer that
			&&
			this.heap[odd_ball] > this.heap[right] // the item being inserted is still too big
		) {
			var temp = this.heap[odd_ball];
			this.heap[odd_ball] = this.heap[right];
			this.heap[right] = temp;

			this.bubble_down(right);
		} else {
			if (
				left < this.heap.length // still in the heap
				&&
				this.heap[odd_ball] > this.heap[left] // and this left side is smallest and the item is large
			) {
				var temp = this.heap[odd_ball];
				this.heap[odd_ball] = this.heap[left];
				this.heap[left] = temp;

				this.bubble_down(left);
			}
		}
	}

	PriorityQueue.prototype.take = function() {
		if (this.heap.length > 0) {
			var item = this.heap.shift();
			this.heap.unshift(this.heap.pop());
			this.bubble_down(0);
			return item;
		}

		throw "empty queue";
	}

	return PriorityQueue;
}());