var _ = require('lodash');

module.exports.tsp_simulated_annealing = function(cities, tour_length, time_bound, cooling) {
		var best_tour = _.range(cities.length);
		var best_dist = tour_length(cities, _.range(cities.length));

		var annealing_threshold = best_dist / 10;

		var current_tour = best_tour.slice(0);
		var current_dist = best_dist;

		function mutate(tour) {
			// more efficient would be to remember which cities changed and reverse the mutation in place
			// rather than taking copies of whole arrays
			var new_tour = tour.slice(0);
			var cityA = (Math.random() * cities.length) >> 0;
			var cityB = (cityA + 1) % cities.length;
			var tempCity = new_tour[cityA];
			new_tour[cityA] = new_tour[cityB];
			new_tour[cityB] = tempCity;
			return new_tour; 
		}

		function anneal() {
			// approximating the textbook sigmoid curve with a simple hard edged true/false
			var start = new Date();

			while (((new Date()) - start) < time_bound) {	
				var next_tour = mutate(current_tour);
				var next_dist = tour_length(cities, next_tour);

				var acceptable_distance = ((current_dist * 2) + annealing_threshold) / 2;
				if (!(annealing_threshold > 0)) { 
					annealing_threshold = 0; 
				} else {
					annealing_threshold = annealing_threshold * cooling;
				}
			
				if (next_dist < acceptable_distance) {
					current_tour = next_tour;
					current_dist = next_dist;

					if (current_dist < best_dist) {
						best_tour = current_tour.slice(0);
						best_dist = current_dist;
					}
				}
			}
		}

		var start_time = new Date();
		anneal();
		var end_time = new Date();
		var elapsed_time = end_time - start_time;

		return {
			best_tour: best_tour,
			best_distance: best_dist,
			elapsed_time: elapsed_time
		}

	}