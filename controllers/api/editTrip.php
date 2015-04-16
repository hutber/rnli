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

			if(is_array($notes)) {
				foreach ($notes as $key => $item) {
					if($item['new']){
						$dataStore->insertNote($uid, $id, $item['note'], $item['date']);
					}else {
						$dataStore->editNote($id, $item['note']);
					}
				}
			}

			if(is_array($catch)) {
				foreach ($catch as $key => $item) {
					if($item['new']=="true"){
						$dataStore->insertCatch($uid, $id, $item['species'], $item['weight1'], $item['weight2'], $item['height1'], $item['height2'], $item['released'], $item['image'], $item['date']);
					}else {
						$dataStore->editNote($id, $item['note']);
					}
				}
			}

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