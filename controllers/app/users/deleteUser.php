<?php

class deleteUser extends webController {

    function post($type)
    {
        if (isset($_POST)) {


			require_once  $_SERVER['DOCUMENT_ROOT'] .'/db/db.php';
			$db = new DB();

			require_once  $_SERVER['DOCUMENT_ROOT'] .'/db/data.php';
			$dataStore = new Data($db);

			$dataStore->delUser($_POST['sess']);
        }
    }
}