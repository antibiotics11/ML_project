<?php

function to_json(String $file): String {

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

function to_grayscale_json(String $json_img): String {

	$json_decoded = json_decode($json_img, true);
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

