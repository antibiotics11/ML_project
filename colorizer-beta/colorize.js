module.exports = function() {
	
	this.colorize = function(filename) {
		
		var tf = require("@tensorflow/tfjs-node");
		var fs = require("fs");
		var Jimp = require("jimp");
		require("./png.js")();
		
		tf.loadLayersModel("file://trained_model/model.json").then(function(model) {
			Jimp.read("image/uploaded/" + filename).then(img => {
			
				console.log("Coloring " + filename + "...");

				var width = img.bitmap.width;
				var height = img.bitmap.height;
				
				var grayscale_values = Array.from(Array(height), () => new Array(width));
				
				for (var y = 0; y < height; y++) {
					for (var x = 0; x <= width; x++) {
					
						var hex = img.getPixelColor(x, y)
						grayscale_values[y][x] = Jimp.intToRGBA(hex).r;
						
					}
				}

				var per = height / 100;
				var stat = 0;
				
				var rgb_values = Array.from(Array(height), () => new Array(width));
				
				for (var i = 0; i < height; i++) {
					for (var j = 0; j < width; j++) {
						
						var values = model.predict(tf.tensor([grayscale_values[i][j]]));
						rgb_values[i][j] = Array.from(values.dataSync(values));
					
					}
					if (stat != Math.ceil(i / per)) {
						stat = Math.ceil(i / per);
						console.log(stat + "% completed...");
					}
				}
			
				png("image/result/" + filename, width, height, rgb_values);
			
			});
		});
		
	};
	
}
