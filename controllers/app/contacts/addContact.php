<?php

class addContact extends Controller {

    function post($type)
    {
        if (isset($_POST)) {
			require_once $_SERVER['DOCUMENT_ROOT'] . '/db/db.php';
			$db = new DB();

			require_once $_SERVER['DOCUMENT_ROOT'] . '/db/types/DBtrip.php';
			$dataStore = new DBtrip($db);

			$uid = $_POST['uid'];
			$name = $_POST['name'];
			$number = $_POST['number'];

			$dataStore->insertContact($uid, $name, $number);

			$results = $dataStore->getContacts($uid);

			print json_encode($results);
        }
    }
}