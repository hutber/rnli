<?php

$messages = array();

class takeGPS extends Controller {

    function get (){

		//DB init
		require_once SITEROOT. '/db/db.php';
		$db = new DB();
		require_once SITEROOT. '/db/types/DBApi.php';
		$dataStore = new DBApi($db);


		$lat = $_POST['lat'];
		$long = $_POST['long'];

		$dataStore -> addGPS($lat, $long);
	}
    function post (){

		//DB init
		require_once SITEROOT. '/db/db.php';
		$db = new DB();
		require_once SITEROOT. '/db/types/DBApi.php';
		$dataStore = new DBApi($db);


		$lat = $_POST['lat'];
		$long = $_POST['long'];

		$dataStore -> addGPS($lat, $long);
	}

};