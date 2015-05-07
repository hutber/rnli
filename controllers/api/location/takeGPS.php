<?php

$messages = array();

class takeGPS extends controller {

    function get (){

		//DB init
		require_once SITEROOT. '/db/db.php';
		$db = new DB();
		require_once SITEROOT. '/db/types/DBApi.php';
		$dataStore = new DBApi($db);
		
		// $location = json_decode();
// c($location->location);

		$post = '{"auth_token":"hutber","foo":"bar","location":{"latitude":"51.6177441","longitude":"-0.1385274","accuracy":"25.0","speed":"0.0","bearing":"0.0","altitude":"0.0","recorded_at":"2015-04-07T16:00Z"}}';
		$data = json_decode($post);
		$location = $data->location;

		$accuracy = $location->accuracy;
		$altitude = $location->altitude;
		$altitudeAccuracy = $location->altitudeAccuracy;
		$heading = $location->heading;
		$latitude = $location->latitude;
		$longitude = $location->longitude;
		$speed = $location->speed;

		//$dataStore -> addGPS($accuracy, $altitude, $altitudeAccuracy, $heading, $latitude, $longitude, $speed);
		// $arr1 = array ('a'=>1,'b'=>2,'c'=>3,'d'=>4,'e'=>5);
		// file_put_contents("/var/www/trackmycatch.rnli.org/controllers/api/location/array.json",json_encode($post));
	}

    function post ($type){
		
		$data = array();
		
		//DB init
		require_once SITEROOT. '/db/db.php';
		$db = new DB();
		require_once SITEROOT. '/db/types/DBApi.php';
		$dataStore = new DBApi($db);

		$data = json_decode($_POST);
		$location = json_decode(file_get_contents('php://input'))->location;
		$uid = json_decode(file_get_contents('php://input'))->uid;
		$tid = json_decode(file_get_contents('php://input'))->tid;

		$accuracy = $location->accuracy;
		$altitude = $location->altitude;
		$altitudeAccuracy = $location->altitudeAccuracy;
		$heading = $location->heading;
		$latitude = $location->latitude;
		$longitude = $location->longitude;
		$speed = $location->speed;

		$dataStore -> addGPS($uid, $tid, $accuracy, $altitude, $altitudeAccuracy, $heading, $latitude, $longitude, $speed);

	}

};