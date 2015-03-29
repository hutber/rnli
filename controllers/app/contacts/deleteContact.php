<?php

class deleteContact extends Controller {

    function post($type)
    {
        if (isset($_POST)) {
			require_once $_SERVER['DOCUMENT_ROOT'] . '/db/db.php';
			$db = new DB();

			require_once $_SERVER['DOCUMENT_ROOT'] . '/db/types/DBtrip.php';
			$dataStore = new DBuser($db);

			$uid = $_POST['uid'];
			$id = $_POST['id'];
			$dataStore->deleteContact($uid, $id);

			$results['data'] = $dataStore->getContacts($uid);
			$results['status'] = 'good';
			$results['message'] = 'Contact Was Deleted';
			print json_encode($results);
        }
    }
}