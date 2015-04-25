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


			switch ($rating) {
				case "4":
					$rating = 1;
					break;
				case "3":
					$rating = 2;
					break;
				case "2":
					$rating = 3;
					break;
				case "1":
					$rating = 4;
					break;
				default:
					$rating = 5;
			}

			$dataStore->updateRating($rating, $id);
			header('Content-Type: application/javascript');
			print json_encode($rating);
        }
    }
}