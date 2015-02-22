<?php

class reg extends controller
{
	function post($type)
	{
		$data = array();

		require_once $_SERVER['DOCUMENT_ROOT'] .'/db/db.php';
		$db = new DB();

		require_once $_SERVER['DOCUMENT_ROOT'] .'/db/types/DBregistration.php';
		$dataStore = new DBregistration($db);
		if (isset($_POST) && count($_POST) != 0) {

			$fname = ucwords(strtolower($_POST['fname']));
			$sname = ucwords(strtolower($_POST['sname']));
			$pword = $_POST['pw'];
			$device = $_POST['device'];
			$version = $_POST['version'];
			$email = $_POST['email'];
			$pkey = $_POST['pkey'];

			if ($pword == "") {
				$data['error'] = 'Please set a Password';
				$error = true;
			}
			if ($email == "") {
				$data['error'] = 'Please set a Email';
				$error = true;
			}
			if ($fname == "") {
				$data['error'] = 'Please set a First Name';
				$error = true;
			}
			if ($email == "") {
				$data['error'] = 'Please set a Second Name';
				$error = true;
			}

//			//Checks that the pword isn't to small
//			if (strlen($pword) < 8 || strlen($pword) > 16) {
//				$data['error'] = 'Your password is not right length - Please make sure it is between 8 to 16 characters';
//				$error = true;
//			}
			if(isset($pkey)) {
				//first check if the user has changed email addresses then check email hasn't been used before
				if ($dataStore->sessionCheckEmailCheck($email, $pkey) != 1 && $dataStore->adminEmailCheck($email)) {
					$data['error'] = 'Sorry but this email Address is already taken';
//					$error = true;

					$data['hasError'] = $error;
				}
				//If no errors then add user to database and send confirmation email
				if ($error == false) {
					if($pword == "password"){
						$pword = $dataStore->getCurrentPword($pkey)[0]['pword'];
					}
					$dataStore->updateUsers($fname, $sname, $email, $pword, $device, $version, $pkey);
					$data['good'] = "Details have been saved";
				}
			}else{
				//check email hasn't been used before
				$numemailcheck = $dataStore->adminEmailCheck($email);
				$uname = strtolower($fname.$sname);
				$numunamecheck = $dataStore->adminUsernameCheck($uname);
				//first check if the user has changed email addresses then check email hasn't been used before

				if ($numemailcheck == 0) {
					//If no errors then add user to database and send confirmation email
					if ($error == false) {

						require_once $_SERVER['DOCUMENT_ROOT'] .'/class/sendMail.php';

//						if(strpos($email,'@topaz-marine.com') !== false){
							$confirmed = 1;
//						}else{
//							$confirmed = 0;
//						}

						$reg = $dataStore->insertUsers($fname, $sname, $uname, $email, $pword, $device, $version, $confirmed);

						if ($reg) {
							if($numunamecheck<1) {
								$newUser = $dataStore->grabLastUser();

								$newUser['fname'] = $fname;
								$newUser['email'] = $email;
								$newUser['uname'] = $uname;

								$from_address = 'noreply@rnli.com';

								$from_group = 'Registration';
								$article_date = date('l, jS F y');

								//Email Subjet
								$subject = 'Your Topaz Account is being reviewed';

								//Email Details to inset into the email Array
								$email_vars = array('title' => 'Account Registered', 'fname' => $newUser['fname'], 'email' => $newUser['email'], 'uname' => $newUser['uname']);

								//Build Up email details
								$registars_details = array();
								$registars_details[0]['uid'] = $newUser['uid'];
								$registars_details[0]['email'] = $newUser['email'];
								$registars_details[0]['uname'] = $newUser['uname'];
								$registars_details[0]['type'] = 'Registration';

								//Do oop function
								$myMail = new Email('[RNLI] Account Registered', $subject, $from_group, $from_address, $article_date, $email_vars, $registars_details);
								//$subject, $title, $from_group, $from, $email_date, $email_vars,$email_notifications
								//(Email Subject, Emails Title, email type aka which template to use, From Address, Email Date)
								$myMail->createEmailVars();
								$myMail->send();
							}

//							if($confirmed==0) {
								$data['good'] = "Registration complete, please log in";
//							}else{
//								$data['good'] = "Thank you, you have been auto logged in.";
//							}
							$data['uname'] = $uname;
							$data['previous'] = $numunamecheck;
						} else {
							$data['error'] = "Sorry, but the registration failed on our end";
						}

					}
				}else{
					$data['error'] = 'Sorry but this email Address is already taken';
					$error = true;
				}
			}
		}else{
			$data['bad'] = "Nothing was posted :/";
		}
		print json_encode($data);
	}
}