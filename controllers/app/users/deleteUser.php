<?php

class deleteUser extends webController {

    function post($type)
    {
        if (isset($_POST)) {


			require_once  SITEROOT.'/db/db.php';
			$db = new DB();

			require_once  SITEROOT.'/db/data.php';
			$dataStore = new Data($db);

			$dataStore->delUser($_POST['sess']);
        }
    }
}