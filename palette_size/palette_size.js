var _ = require('lodash');
var util = require('util');

function ranges_without_overlaps(colours, samples) {
	var last_colour = current_colour = (Math.random() * colours)>>0;
	var run_without_matches = 0;
	var runs = [];

	for (var i = 0; i < samples; i++) {
		if (last_colour == current_colour) {
			run_without_matches = 0;
		} else {
			run_without_matches++;
		}

		for (var j = 0; j <= run_without_matches; j++) {
			if (!runs[j]) {
				runs[j] = 0;
			}

			runs[j]++;
		}

		last_colour = current_colour;
		current_colour = (Math.random() * colours)>>0;
	}

	return runs;
}

var colours = 150;
var samples = 100000;

for (;colours > 0; colours -= 10) {

	_(ranges_without_overlaps(colours, samples))
		.map(function(runs, length) {
			return (100*runs/samples)>>0; 
		})
		.forEach(function(percentage, length) {
			if (percentage == 95) {
		    	util.puts("with "+colours+" colours "+percentage+"% of runs of length "+length+" have no pairs.");	
			}
		});

}