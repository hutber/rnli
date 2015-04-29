<?php

class updateRating extends Controller {

    function post($type)
    {
        if (isset($_POST)) {
			require_once SITEROOT. '/db/db.php';
			$db = new DB();

			require_once SITEROOT. '/db/types/DBtrip.php';
			$dataStore = new DBtrip($db);


			$id = $_POST['id'];
			$rating = $_POST['rating'];

			$dataStore->updateRating($rating, $id);
			header('Content-Type: application/javascript');
			print json_encode($rating);
        }
    }
}