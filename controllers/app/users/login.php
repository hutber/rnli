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
					$messages['message'] = "Email or Password Incorrect";
					$messages['code'] = 0;
				}else {
					//grab all details from the get stats function
					$messages = $checkDetails;
					//add security field
					$messages['token'] = $this->login->createToken($checkDetails, 3600 * 24 * 30);
				}
			}
			print json_encode($messages);
		}
	}

};
