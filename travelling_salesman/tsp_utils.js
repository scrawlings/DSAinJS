var _ = require('lodash');

module.exports.tsp_utils = {
	tour_length: function(cities, tour) {
		var cities_modulo = cities.length; 
		return (_.reduce(tour, function(memo, value, index) {
			var city = cities[tour[index]];
			var next = cities[tour[(index + 1) % cities_modulo]];
			var x = (city.x > next.x) ? (city.x - next.x) : (next.x - city.x);
			var y = (city.y > next.y) ? (city.y - next.y) : (next.y - city.y);
			return memo + Math.sqrt(x*x + y*y);
		}, 0));
	},

	random_map_of_cities: function(count) {
		return (_.map(_.range(count), function(index) {
			return {
				x: Math.random(),
				y: Math.random()
			}
		}));
	}
}