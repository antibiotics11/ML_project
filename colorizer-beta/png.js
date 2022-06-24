module.exports = function() {

this.png = function(filename, width, height, rgb_values) {

	var fs = require("fs");
	var PNG = require("pngjs").PNG;

	var file = new PNG({
		width: width,
		height: height,
		filterType: -1
	});

	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {

			var idx = (file.width * y + x) << 2;
			
			file.data[idx] = rgb_values[y][x][0];
			file.data[idx + 1] = rgb_values[y][x][1];
			file.data[idx + 2] = rgb_values[y][x][2];
			file.data[idx + 3] = 255;

		}
	}

	file.pack().pipe(fs.createWriteStream(filename));

	return;

};
	
}
