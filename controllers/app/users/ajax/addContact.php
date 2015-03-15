<?php

class addContact extends Controller {

    function post($type)
    {
        if (isset($_POST)) {
			require_once  $_SERVER['DOCUMENT_ROOT'] .'/db/db.php';
			$db = new DB();

			require_once  $_SERVER['DOCUMENT_ROOT'] .'/db/types/DBuser.php';
			$dataStore = new DBuser($db);

			c($_POST);
//			$dataStore->addContact($_POST['name'], $_POST['number']);
        }
    }
}