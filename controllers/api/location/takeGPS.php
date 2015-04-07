<?php

$messages = array();

class takeGPS extends Controller {

    function get (){

		//DB init
		require_once SITEROOT. '/db/db.php';
		$db = new DB();
		require_once SITEROOT. '/db/types/DBApi.php';
		$dataStore = new DBApi($db);

		$accuracy = $_POST['accuracy'];
		$altitude = $_POST['altitude'];
		$altitudeAccuracy = $_POST['altitudeAccuracy'];
		$heading = $_POST['heading'];
		$latitude = $_POST['latitude'];
		$longitude = $_POST['longitude'];
		$speed = $_POST['speed'];
		
		$dataStore -> addGPS($accuracy, $altitude, $altitudeAccuracy, $heading, $latitude, $longitude, $speed);
	}

    function post (){
		file_put_contents("/var/www/rnli.hutber.com/controllers/api/location/filename.txt", serialize($_POST));
		file_put_contents("/var/www/rnli.hutber.com/controllers/api/location/accuracy.txt", serialize($_POST['location']['accuracy']));
		
		$location = json_decode($_POST['location']);
		file_put_contents("/var/www/rnli.hutber.com/controllers/api/location/jsondecode.txt", serialize($location));
		//DB init
		require_once SITEROOT. '/db/db.php';
		$db = new DB();
		require_once SITEROOT. '/db/types/DBApi.php';
		$dataStore = new DBApi($db);

		$location = json_decode($_POST['location']);

		$accuracy = $location['accuracy'];
		$altitude = $location['altitude'];
		$altitudeAccuracy = $location['altitudeAccuracy'];
		$heading = $location['heading'];
		$latitude = $location['latitude'];
		$longitude = $location['longitude'];
		$speed = $location['speed'];

		$dataStore -> addGPS($accuracy, $altitude, $altitudeAccuracy, $heading, $latitude, $longitude, $speed);
	}

};