var tensorflow = require("@tensorflow/tfjs-node"),
	fs = require("fs");

var rgb_data = fs.readFileSync("dataset/color-json/1.json", "utf8");
var grayscale_data = fs.readFileSync("dataset/grayscale-json/1.json", "utf8");
rgb_data = JSON.parse(rgb_data);
grayscale_data = JSON.parse(grayscale_data);

var rgb_values = [];
var grayscale_values = [];

var k = 0;
for (var i = 0; i < rgb_data.length; i++) {
	for (var j = 0; j < rgb_data[0].length; j++) {

		rgb_values[k] = rgb_data[i][j];
		grayscale_values[k] = grayscale_data[i][j];
		k++;

	}
}

console.log(grayscale_values);

var rgb_tensor = tensorflow.tensor(rgb_values);
var grayscale_tensor = tensorflow.tensor(grayscale_values);

var X = tensorflow.input({ shape: [1] });
var Y = tensorflow.layers.dense({ units: 3 }).apply(X);

var model = tensorflow.model({ inputs: X, outputs: Y });
var compileParam = { 
	optimizer: tensorflow.train.adam(), 
	loss: tensorflow.losses.meanSquaredError 
};

model.compile(compileParam);

var fitParam = {
	epochs: 1,
	callbacks: {
		onEpochEnd:function(epoch, logs) {
			console.log('epoch', epoch, logs);
		}
	}
}

model.fit(grayscale_tensor, rgb_tensor, fitParam).then(function() {
	model.save("file://colorizer");
});
