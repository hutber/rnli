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

};