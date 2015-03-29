 <?php

class checkKey extends Controller {
    function post()
    {
        if (isset($_POST)) {
			$uid = $_POST['ierihias'];
			$privateKey = $_POST['adfbse4'];

			$results = $this->login->dataStore->checkIsKeyUpToDate($uid, $privateKey);

			print json_encode($results[0]);
		}
    }
}