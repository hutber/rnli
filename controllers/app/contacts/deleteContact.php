<?php

class deleteContact extends Controller {

    function post($type)
    {
        if (isset($_POST)) {
			require_once $_SERVER['DOCUMENT_ROOT'] . '/db/db.php';
			$db = new DB();

			require_once $_SERVER['DOCUMENT_ROOT'] . '/db/types/DBtrip.php';
			$dataStore = new DBtrip($db);

			$uid = $_POST['uid'];
			$id = $_POST['id'];
			$dataStore->deleteContact($uid, $id);

			$results = $dataStore->getContacts($uid);

			print json_encode($results);
        }
    }
}