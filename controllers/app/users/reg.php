<?php

class reg extends controller
{
	function post($type)
	{
		$data = array();

		require_once SITEROOT.'/db/db.php';
		$db = new DB();

		require_once SITEROOT.'/db/types/DBregistration.php';
		$dataStore = new DBregistration($db);

		require_once  SITEROOT.'/db/types/DBuser.php';
		$DBuser = new DBuser($db);

		if (isset($_POST) && count($_POST) != 0) {

			$fname = ucwords(strtolower($_POST['fname']));
			$sname = ucwords(strtolower($_POST['sname']));
			$pword = $_POST['pw'];
			$device = $_POST['device'];
			$version = $_POST['version'];
			$email = $_POST['email'];
			$uid = $_POST['uid'];
			$terms = $_POST['acc_tc'];
			$token = $_POST['token'];

			if ($pword == "" && !isset($uid)) {
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
			if(isset($token)) {
				//first check if the user has changed email addresses then check email hasn't been used before
				if ($dataStore->sessionCheckEmailCheck($email, $token) != 1 && $dataStore->adminEmailCheck($email)) {
					$data['error'] = 'Sorry but this email Address is already taken';
//					$error = true;

					$data['hasError'] = $error;
				}
				//If no errors then add user to database and send confirmation email
				if ($error == false) {
					if($pword == "password" || $pword==""){
						$result = $dataStore->getCurrentPword($token);
						$pword = $result[0]['pword'];
					}
					//work out new people with old people
					$newContacts = array();
					forEach ($_POST as $key => $item) {
						if (stripos($key, 'new')  !== false) {
							$itemName = 'person_'.substr($key, -1);
							if (!isset($newContacts[$itemName])) {
								$newContacts[$itemName] = array();
							}
							$currentItem = substr($key, 0, stripos($key, '_'));
							if($currentItem == "id"){
								$newContacts[$itemName][$currentItem] = substr($_POST[$key], stripos($_POST[$key], '_')+1);
							}else {
								$newContacts[$itemName][$currentItem] = $_POST[$key];
							}
						}
					};
					$values['newContacts'] = $newContacts;
					foreach($values['newContacts'] as $key => $item){
						$DBuser->insertContact($_POST['uid'], $item['name'], $item['number']);
					}

					$dataStore->updateUsers($fname, $sname, $email, $pword, $device, $version, $token);
					$data['contacts'] = $DBuser->getContacts($uid);
					$data['good'] = "Details have been saved";
				}
			}else{
				if ($terms != 1) {
					$data['error'] = 'Please Accept our Terms';
					$error = true;
				}
				//check email hasn't been used before
				$numemailcheck = $dataStore->adminEmailCheck($email);
//				$uname = strtolower($fname.$sname);
				$uname = $email;
				$numunamecheck = $dataStore->adminUsernameCheck($uname);
				//first check if the user has changed email addresses then check email hasn't been used before

				if ($numemailcheck > 0) {
					//If no errors then add user to database and send confirmation email
					if ($error == false) {

						require_once SITEROOT.'/class/sendMail.php';

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
								$subject = 'Your RNLI Account is being reviewed';

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
							$errors['status'] = 'good';
							$errors['message'] = 'Registration complete, please log in';
//							}else{
//								$data['good'] = "Thank you, you have been auto logged in.";
//							}
							$data['uname'] = $uname;
							$data['previous'] = $numunamecheck;
						} else {
							$errors['status'] = 'bad';
							$errors['message'] = 'Sorry, but the registration failed on our end';
						}

					}
				}else{
					$errors['status'] = 'bad';
					$errors['message'] = 'Sorry but this email Address is already taken';
					$error = true;
				}
			}
		}else{
			$errors['status'] = 'bad';
			$errors['message'] = 'Nothing was posted :/';
		}
		print json_encode($data);
	}
}