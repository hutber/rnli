<?php

$messages = array();

class login extends Controller {

	function post (){
		if (isset($_POST)) {

			if ($_POST['email'] != "" && $_POST['pword'] == "") {
				$messages['message'] = "Please supply a password";
			} elseif ($_POST['email'] == "") {
				$messages['message'] = "Please supply a username";
			} elseif ($_POST['email'] != "" && $_POST['pword'] != "") {
				$detailsSent['email'] = strtolower($_POST['email']);
				$detailsSent['pword'] = $_POST['pword'];

				$checkDetails = $this->login->check_user_details($detailsSent);

				if (!$checkDetails['uid']) {
					$checkDetails = $this->login->check_user_details_username($detailsSent);
				}
				if (!$checkDetails['uid']) {
					$errors['status'] = 'bad';
					$messages['message'] = "Email or Password Incorrect";
					$messages['code'] = 0;
				}else {
					//DB init
					require_once $_SERVER['DOCUMENT_ROOT'] . '/db/db.php';
					$db = new DB();
					require_once $_SERVER['DOCUMENT_ROOT'] . '/db/types/DBtrip.php';
					$dataStore = new DBtrip($db);

					//grab all details from the get stats function
					$messages = $checkDetails;

					//all previous info items
					$messages['contacts'] = $this->login->getUsersContacts($checkDetails['uid']);
					$messages['catch'] = $dataStore->getCatches($checkDetails['uid']);
					$messages['trips'] = $dataStore->getTrips($checkDetails['uid']);
					$messages['notes'] = $dataStore->getNotes($checkDetails['uid']);
					$messages['trips'] = $dataStore->getLocation($checkDetails['uid']);


					//add security field
					$messages['token'] = $this->login->createToken($checkDetails, 3600 * 24 * 30);
				}
			}
			header('Content-Type: application/javascript');
			print json_encode($messages);
		}
	}

};
