<?php

class addTrip extends Controller {

    function post($type)
    {
        if (isset($_POST)) {
			require_once $_SERVER['DOCUMENT_ROOT'] . '/db/db.php';
			$db = new DB();

			require_once $_SERVER['DOCUMENT_ROOT'] . '/db/types/DBtrip.php';
			$dataStore = new DBtrip($db);


			$uid = $_POST['uid'];
			$trip = $_POST['trip'];
			$catch = $_POST['catch'];
			$location = $_POST['location'];
			$notes = $_POST['notes'];

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

			foreach($notes as $key => $item){
				$dataStore->insertNote($uid, $tripdId, $item['text'], $item['date']);
			}

			foreach($catch as $key => $item){
				$catch = $item['data'];
				$dataStore->insertCatch($uid,$tripdId,$catch['species'],$catch['weight1'],$catch['weight2'],$catch['height1'],$catch['height2'],$catch['released'],$catch['image'],$item['date']);
			}

			$dataStore->insertLocation($uid,$tripdId, $location['lat'], $location['long'], $location['area'], $location['continent'], $location['country'], $location['pcode']);

			$data['catch'] = $dataStore->getCatches($uid);

			header('Content-Type: application/javascript');
			print json_encode($data);
        }
    }
}