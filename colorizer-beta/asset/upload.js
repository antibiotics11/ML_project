upload_image.onchange = (evt) => {
	
	const file = upload_image.files[0];
	const filename = upload_image.files[0].name;
	const filetype = file["type"];
	const valid_types = ["image/jpg", "image/jpeg", "image/png"];
	
	const stat = document.getElementById("status");
	const preview = document.getElementById("upload-preview");
	
	stat.style.color = "#00ba00";
								
	if (!valid_types.includes(filetype)) {
		stat.style.color = "red";
		stat.innerHTML = "ERROR: Invalid file type. Please upload only jpg, jpeg, or png files.";
		document.getElementById("upload_image").value = "";
		return;
	}
								
	const img = new Image();
	img.src = URL.createObjectURL(file);
	img.onload = () => {
		
		if (img.width > 1920 || img.height > 1080) {
			stat.style.color = "red";
			stat.innerHTML = "ERROR: File is too large. Please upload the file size 1920*1080 or less.";
			document.getElementById("upload_image").value = "";
		} else {
			document.getElementById("filename").value = filename;
			
			preview.style.paddingBottom = "0";
			preview.src = window.URL.createObjectURL(file);
			preview.src = window.webkitURL.createObjectURL(file);
			
			stat.innerHTML = "Uploading Image...";
			stat.style.color = "#00ba00";
			
			var fd = new FormData();
			fd.append("upload", file);
			console.log(file);
			
			var xhttp = new XMLHttpRequest();
			xhttp.open("POST", "colorizer-beta/upload");
			//xhttp.setRequestHeader("Content-type", "multipart/form-data");
			xhttp.send(fd);
			
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {
					
					stat.innerHTML = "Coloring image... Please wait a few minutes.";
					
					var xhttp_get = new XMLHttpRequest();
					xhttp_get.open("GET", "colorizer-beta/colorize?img=" + file.name, false);
					xhttp_get.send(null);

					var src = "/image/result/" + file.name;
					
					setInterval(() => {

						$.ajax({
							url:src,
							type:'HEAD',
							success: function() {
								
								$("#result-preview").attr("src", src);
								stat.innerHTML = "Complete";
							}
						});

					}, 2000);
					
				}
			}
			
		}
	};
								
	return;
	
};
