var fs = require("fs"),
	PNG = require("pngjs").PNG;

var path = "grayscale_json/1.jpg.json";
var jsonfile = fs.readFileSync(path, "utf8");
var jsonobj= JSON.parse(jsonfile);

var jsondata = Object.values(jsonobj);

var png = new PNG({
	width: jsondata[0].length,
	height: jsondata.length,
	filterType: -1
});


for (var y = 0; y < jsondata.length; y++) {
	for (var x = 0; x < jsondata[0].length; x++) {
		
		var idx = (png.width * y + x) << 2;
		var value = jsondata[y][x] / 3;

		png.data[idx] = value;
		png.data[idx + 1] = value;
		png.data[idx + 2] = value;
		png.data[idx + 3] = 255;

	}
}

png.pack().pipe(fs.createWriteStream("grayscale-test/1.grayscale-test.png"));

