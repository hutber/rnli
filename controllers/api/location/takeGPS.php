<?php

$messages = array();

class takeGPS extends Controller {

    function get (){

		//DB init
		require_once SITEROOT. '/db/db.php';
		$db = new DB();
		require_once SITEROOT. '/db/types/DBApi.php';
		$dataStore = new DBApi($db);
		
		$location = json_decode('{"auth_token":"hutber","foo":"bar","location":{"latitude":"51.6177441","longitude":"-0.1385274","accuracy":"25.0","speed":"0.0","bearing":"0.0","altitude":"0.0","recorded_at":"2015-04-07T16:00Z"}}');
c($location);
		$accuracy = $location->accuracy;
		$altitude = $location->altitude;
		$altitudeAccuracy = $location->altitudeAccuracy;
		$heading = $location->heading;
		$latitude = $location->latitude;
		$longitude = $location->longitude;
		$speed = $location->speed;

		$dataStore -> addGPS($accuracy, $altitude, $altitudeAccuracy, $heading, $latitude, $longitude, $speed);
	}

    function post (){
		
		//DB init
		require_once SITEROOT. '/db/db.php';
		$db = new DB();
		require_once SITEROOT. '/db/types/DBApi.php';
		$dataStore = new DBApi($db);

		$location = json_decode($_POST);

		$accuracy = $location->accuracy;
		$altitude = $location->altitude;
		$altitudeAccuracy = $location->altitudeAccuracy;
		$heading = $location->heading;
		$latitude = $location->latitude;
		$longitude = $location->longitude;
		$speed = $location->speed;

		$dataStore -> addGPS($accuracy, $altitude, $altitudeAccuracy, $heading, $latitude, $longitude, $speed);
	}

};