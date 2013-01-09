var _ = require('lodash');
var Backtracker = require('./../backtracker/backtracker.js').StackBacktracker;

function tour_length(cities, tour) {
	var cities_modulo = cities.length; 
	return (_.reduce(tour, function(memo, value, index) {
		var city = cities[tour[index]];
		var next = cities[tour[(index + 1) % cities_modulo]];
		var x = (city.x > next.x) ? (city.x - next.x) : (next.x - city.x);
		var y = (city.y > next.y) ? (city.y - next.y) : (next.y - city.y);
		return memo + Math.sqrt(x*x + y*y);
	}, 0));
}

module.exports.tsp_brute_force = function(cities) {
		var basic_tour = _.range(cities.length);
		var best_tour = _.range(cities.length);
		var best_dist = tour_length(cities, _.range(cities.length));

 		var tsp = new Backtracker({
			possible_next_moves: function(cities, memo, tour) {
				return _.difference(basic_tour, tour);
			},
			possible_result: function(cities, memo, tour) {
				if (tour.length == cities.length) {
					var dist = tour_length(cities, tour);
					if (dist < best_dist) {
						best_dist = dist;
						best_tour = tour.slice(0);
					}
				}
			}
		});


		var start_time = new Date();
		tsp.execute(cities);
		var end_time = new Date();
		var elapsed_time = end_time - start_time;

		return {
			best_tour: best_tour,
			best_distance: best_dist,
			elapsed_time: elapsed_time
		}

	}