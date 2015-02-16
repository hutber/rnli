<?php

class addobservation extends controller
{
	function post($type)
	{
		$data = array();

		if (isset($_POST) && count($_POST) != 0) {
			$comment = $_POST['comment'];
			$vessel = $_POST['vessel'];
			$region = $_POST['region'];
			$time = $_POST['time'];
			$type = $_POST['type'];
			$uid = $_POST['user'];
			$pkey = $_POST['pkey'];
			$observations = json_decode($_POST['observations']);

			if(isset($pkey)) {

				$latestID = $this->login->dataStore->addObservation($uid, $type, $vessel, $region, rtrim($time, "Z"), $comment, $pkey)[0]['id'];

				foreach($observations as $key => $val) {
					foreach($val as $item => $itemVal){
						$this->login->dataStore->insertObservationDetail($latestID, $item);
					}
				}

				$data['good'] = "success";
			}else{
				$data['error'] = "error";
			}
		}else{
			$data['bad'] = "Nothing was posted :/";
		}
		print json_encode($data);
	}
}