<?php

class editTrip extends Controller {

    function post($type)
    {
        if (isset($_POST)) {
			require_once SITEROOT. '/db/db.php';
			$db = new DB();

			require_once SITEROOT. '/db/types/DBtrip.php';
			$dataStore = new DBtrip($db);


			$id = $_POST['id'];
			$uid = $_POST['uid'];
			$catch = $_POST['catch'];
			$notes = $_POST['notes'];
			$hazard = $_POST['hazard'];

			$dataStore->updateHazard($hazard, $id);

//			if(is_array($notes)) {
//				foreach ($notes as $key => $item) {
//					 $dataStore->insertNote($uid, $id, $item['text'], $item['date']);
//				}
//			}
//
//			if(is_array($catch)) {
//				foreach ($catch as $key => $item) {
//					$catch = $item['data'];
//					$dataStore->insertCatch($uid, $id, $catch['species'], $catch['weight1'], $catch['weight2'], $catch['height1'], $catch['height2'], $catch['released'], $catch['image'], $item['date']);
//				}
//			}

			$data['catch'] = $dataStore->getCatches($uid);
			$data['trips'] = $dataStore->getTrips($uid);
			$data['notes'] = $dataStore->getNotes($uid);
			$data['locations'] = $dataStore->getLocation($uid);
			$data['thistrip'] = $id;

			header('Content-Type: application/javascript');
			print json_encode($data);
        }
    }
}