<?php

class lookup extends Controller {
	protected function isSecure() {
		if (
			!isset($_SERVER['PHP_AUTH_USER']) ||
			!isset($_SERVER['PHP_AUTH_PW']) ||
			$_SERVER['PHP_AUTH_USER'] != ADMIN_USER ||
			$_SERVER['PHP_AUTH_PW'] != ADMIN_PWD
		) {
			header('WWW-Authenticate: Basic realm="Topax Marine Admin"');
			header('HTTP/1.0 401 Unauthorized');
			exit;
		}
	}
	protected function outputAsCSV($data) {

		$outstream = fopen("php://output", 'w');

		foreach ($data as $row) {
			fputcsv($outstream, $row, ',', '"');
		}

		fclose($outstream);
	}
	function get($type, $data=array()) {

		$this->isSecure();
		$end = $_GET['end'];
		$start = $_GET['start'];
		$users = $this->login->dataStore->getObservations($start, $end);
		foreach($users as $key => $val) {
			foreach(explode(',',$val['observation']) as $keys => $vals) {
				$users[$key]['observation'.$keys] = $vals;
			};
			unset($users[$key]['observation']);
		};
		if(isset($_GET['download'])){
			$fileName = 'topazMarine_'.$start.'_to_'.$end.'.csv';
			header("Content-type: text/csv");
			header("Content-Disposition: attachment; filename=".$fileName);
			header("Pragma: no-cache");
			header("Expires: 0");
			$this->outputAsCSV($users);
			exit();
		}else{
			$this->view('lookup.html', $users);
		}
    }
}