#!/usr/bin/php
<?php

ini_set("memory_limit", "-1");

include_once "to_json.php";

$jpgfiles = scandir(__DIR__."/jpg");

foreach ($jpgfiles as $file) {

	if ($file == "." || $file == "..") {
		continue;
	}

	$jpg_path = __DIR__."/jpg/".$file;
	$json_path = __DIR__."/json/".$file.".json";

	$json_encoded = to_json($jpg_path);

	file_put_contents($json_path, $json_encoded);
	file_put_contents(__DIR__."/grayscale_json/".$file.".json", to_grayscale_json($json_encoded));
	
}

