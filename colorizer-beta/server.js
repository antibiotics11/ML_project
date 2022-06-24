const express = require("express");
const path = require("path");
const fileUpload = require('express-fileupload');
const cors = require("cors");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const port = 80;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//app.set("view engine", "jade");
app.engine("html", require("ejs").renderFile);

app.use(cors({
	origin: "*",
	optionSuccessStatus: 200
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(morgan("dev"));
app.use(fileUpload({
    createParentPath: true
}));

app.get("/", function(req, res) {
	if (req.get("host") !== "colorizer.abx.pe.kr") {	
		res.sendStatus(403);
		return;
	}

	res.redirect("/colorizer-beta");
});
app.use("/asset", express.static(path.join(__dirname, "asset")));
app.use("/image", express.static(path.join(__dirname, "image")));
app.use("/colorizer-beta", require("./router.js"));
app.use(function(req, res) {
	res.status(404).render("404.html");
});

app.listen(port);
