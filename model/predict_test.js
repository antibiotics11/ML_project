var tf = require("@tensorflow/tfjs-node"),
	fs = require("fs");
require("./png.js")();

tf.loadLayersModel("file://trained/model.json").then(function(model) {

	var grayscale = fs.readFileSync("dataset/grayscale-json/1.json");
	var grayscale_values = JSON.parse(grayscale);

	var rgb_values = Array.from(Array(grayscale_values.length), () => new Array(grayscale_values[0].length));
	//var rgb_values = Array.from(Array(grayscale_values.length), () => new Array(grayscale_values[0].length));

	for (var i = 0; i < grayscale_values.length; i++) {
		for (var j = 0; j < grayscale_values[0].length; j++) {

			var values = model.predict(tf.tensor([grayscale_values[i][j]]));
			rgb_values[i][j] = Array.from(values.dataSync(values));
		}
		console.log("["+i+"]["+j+"] => " + rgb_values[i][j - 1] + "\n");
	}
	
	generate_png("colorize-test1-20.png", grayscale_values[0].length, grayscale_values.length, rgb_values);

});

