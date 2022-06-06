var tf = require("@tensorflow/tfjs-node"),
	fs = require("fs");
require("./png.js")();

tf.loadLayersModel("file://trained_model/model.json").then(function(model) {

	var grayscale = fs.readFileSync("dataset/grayscale-json/1.json");
	var grayscale_values = JSON.parse(grayscale);

	var width = grayscale_values[0].length;
	var height = grayscale_values.length;

	var rgb_values = Array.from(Array(height), () => new Array(width));

	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {

			var values = model.predict(tf.tensor([grayscale_values[i][j]]));
			rgb_values[i][j] = Array.from(values.dataSync(values));
		}
		console.log("["+i+"]["+j+"] => " + rgb_values[i][j - 1] + "\n");
	}
	
	generate_png("test/1-test4.png", width, height, rgb_values);

});
