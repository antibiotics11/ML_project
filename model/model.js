var tensorflow = require("@tensorflow/tfjs-node"),
	fs = require("fs");

var X = tensorflow.input({ shape: [1] });
var Y = tensorflow.layers.dense({ units: 3 }).apply(X);

var model = tensorflow.model({ inputs: X, outputs: Y });
var compileParam = { 
	optimizer: tensorflow.train.adam(), 
	loss: tensorflow.losses.meanSquaredError 
};

model.compile(compileParam);

var fitParam = {
	epochs: 70,
	callbacks: {
		onEpochEnd:function(epoch, logs) {
			console.log('epoch', epoch, logs);
		}
	}
}

var rgb_values = [];
var grayscale_values = [];
var k = 0;

for (var num = 1; num <= 1; num++) {
	
	var rgb_data = fs.readFileSync("dataset/color-json/"+num+".json", "utf8");
	var grayscale_data = fs.readFileSync("dataset/grayscale-json/"+num+".json", "utf8");
	
	console.log("Parsing color-json/"+num+".json ...\n");
	rgb_data = JSON.parse(rgb_data);
	console.log("Parsing grayscale-json/"+num+".json ...\n");
	grayscale_data = JSON.parse(grayscale_data);

	console.log("Converting to Array ... \n");
	//var k = 0;
	for (var i = 0; i < rgb_data.length; i++) {
		for (var j = 0; j < rgb_data[0].length; j++) {
			rgb_values[k] = rgb_data[i][j];
			grayscale_values[k] = grayscale_data[i][j];
			k++;
		}
	}

}

console.log("Converting to tensor ... \n");
var rgb_tensor = tensorflow.tensor(rgb_values);
var grayscale_tensor = tensorflow.tensor(grayscale_values);

model.fit(grayscale_tensor, rgb_tensor, fitParam).then(function() {
	model.save("file://trained_model");
});

