var _ = require('lodash');
var util = require('util');

module.exports.priority_queue_sorted_list = (function() {

	function PriorityQueue(initial) {
		this.sorted = true;
		if (!!initial) {
			this.queue = initial.slice(0);
			this.queue.sort(function(a,b){return a-b});
		} else {
			this.queue = [];
		}	
	}

	PriorityQueue.prototype.add = function(item) {
		this.queue.push(item);
		this.sorted = false;
	}


	PriorityQueue.prototype.take = function() {
		if (this.sorted == false) {
			this.queue.sort(function(a,b){return a-b});
			this.sorted = true;
		}
		return this.queue.shift();
	}

	return PriorityQueue;
}());