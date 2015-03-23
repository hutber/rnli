 <?php

class addNote extends Controller {
    function post()
    {
		require_once  $_SERVER['DOCUMENT_ROOT'] .'/db/db.php';
		$db = new DB();

		require_once  $_SERVER['DOCUMENT_ROOT'] .'/db/types/DBtrip.php';
		$dataStore = new DBtrip($db);

        if (isset($_POST)) {
			$uid = $_POST['uid'];
			$note = $_POST['note'];

			$dataStore->insertNote($uid, $note);

			$results = $dataStore->getNotes($uid);

			print json_encode($results);
		}
    }
}