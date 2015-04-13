<?php

class addTrip extends Controller {

    function post($type)
    {
        if (isset($_POST)) {
			require_once SITEROOT. '/db/db.php';
			$db = new DB();

			require_once SITEROOT. '/db/types/DBtrip.php';
			$dataStore = new DBtrip($db);


			$uid = $_POST['uid'];
			$trip = $_POST['trip'];
			$catch = $_POST['catch'];
			$location = $_POST['location'];
			$notes = $_POST['notes'];
			$gps = $_POST['gps'];

			$dataStore->insertTrip(
				$uid,
				$trip['name'],
				$trip['date'],
				$trip['rating'],
				$trip['hazard'],
				$trip['temperature'],
				$trip['visibility'],
				$trip['winddirection'],
				$trip['weathertype'],
				$trip['pressure'],
				$trip['pressuretendency'],
				$trip['dewpoint'],
				$trip['humidity'],
				$trip['seatemperature'],
				$trip['windspeed'],
				$trip['waveheight'],
				$trip['waveperiod']
			);
			$tripdId = $db->getLastID();
			if(is_array($notes)) {
				foreach ($notes as $key => $item) {
					 $dataStore->insertNote($uid, $tripdId, $item['text'], $item['date']);
				}
			}

			if(is_array($catch)) {
				foreach ($catch as $key => $item) {
					$catch = $item['data'];
					$dataStore->insertCatch($uid, $tripdId, $catch['species'], $catch['weight1'], $catch['weight2'], $catch['height1'], $catch['height2'], $catch['released'], $catch['image'], $item['date']);
				}
			}

			if(is_array($gps)) {
				foreach ($gps as $key => $item) {
					$dataStore->insertGPS(
						$uid, $tripdId, $item['accuracy'], $item['altitude'], $item['altitudeAccuracy'], $item['heading'], $item['latitude'], $item['longitude'], $item['speed'], $key
					);
				}
			}

			$dataStore->insertLocation($uid,$tripdId, $location['latitude'], $location['longitude'], $location['area'], $location['continent'], $location['country'], $location['pcode']);

			$data['catch'] = $dataStore->getCatches($uid);
			$data['trips'] = $dataStore->getTrips($uid);
			$data['notes'] = $dataStore->getNotes($uid);
			$data['locations'] = $dataStore->getLocation($uid);
			$data['thistrip'] = $tripdId;

			header('Content-Type: application/javascript');
			print json_encode($data);
        }
    }
}