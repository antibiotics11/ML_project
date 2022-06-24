const express = require("express");
const router = express.Router();

const PATH_ROOT = "colorizer-beta";

router.get("/", function(req, res) {
	res.render(PATH_ROOT + ".html");
});

router.post("/upload", async(req, res) => {
	
	try {
	
		if (!req.files) {
			res.send({ status: false });
		} else {

			let upload = req.files.upload;
			let base = "./image/uploaded/" + upload.name;
			upload.mv(base);
			console.log(base);
			
			res.send({
				status: true,
				message: "uploaded",
				data: {
					name: upload.name,
					mimetype: upload.mimetype,
					size: upload.size
				}
			});
			
		}
	
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/colorize", function(req, res) {
	
	try {
		
		require("./colorize.js")();
		colorize(req.query.img);
		
		res.sendStatus(200);

	} catch (err) {
		res.status(500).send(err)
	}
	
});

router.use(function(req, res) {
	res.status(404).render("404.html");
});

module.exports = router;
