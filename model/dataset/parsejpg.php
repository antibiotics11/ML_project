#!/usr/bin/php

<?php 

ini_set("memory_limit", "-1");

const COLOR_DIR = __DIR__."/color-json/";
const GRAYSCALE_DIR = __DIR__."/grayscale-json/";
	
function to_color_json(String $file): String {

	$size = getimagesize($file); 
	$file = imagecreatefromjpeg($file);
	$pixel_values = array();

	for ($i = 0; $i < $size[1]; $i++) {
		for ($j = 0; $j < $size[0]; $j++) {

			$rgb = imagecolorat($file, $j, $i);
			$r = ($rgb >> 16) & 0xFF;
			$g = ($rgb >> 8) & 0xFF;
			$b = $rgb & 0xFF;

			$pixel_values[$i][$j][0] = $r;
			$pixel_values[$i][$j][1] = $g;
			$pixel_values[$i][$j][2] = $b;

		}
	}

	$json_encoded = json_encode($pixel_values);

	return $json_encoded;

}

function to_grayscale_json(String $color_json): String {

	$json_decoded = json_decode($color_json, true);
	$grayscale_values = array();

	for ($i = 0; $i < count($json_decoded); $i++) {
		for ($j = 0; $j < count($json_decoded[$i]); $j++) {
			
			$grayscale = 0.299 * $json_decoded[$i][$j][0] + 0.587 * $json_decoded[$i][$j][1] + 0.114 * $json_decoded[$i][$j][2];
			$grayscale_values[$i][$j] = $grayscale;

		}
	}

	$json_encoded = json_encode($grayscale_values);

	return $json_encoded;

}

function main(): void {
	
	$jpgfiles = scandir(__DIR__."/jpg/");
	
	foreach ($jpgfiles as $file) {

		if ($file == "." || $file == "..") {
			continue;
		}
		
		$fileinfo = pathinfo($file);
		
		if (trim(strtolower($fileinfo["extension"])) != "jpg") {
			continue;
		}
		
		$filename = $fileinfo["filename"];
		
		$color_json = to_color_json(__DIR__."/jpg/".$file);
		file_put_contents(COLOR_DIR.$filename.".json", $color_json);
		
		$grayscale_json = to_grayscale_json($color_json);
		file_put_contents(GRAYSCALE_DIR.$filename.".json", $grayscale_json);
		
	}
}

main();
