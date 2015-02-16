<?php

class forgotten extends controller {

    function post($type) {
        if (isset($_POST)) {

            require_once $_SERVER['DOCUMENT_ROOT'] .'/db/db.php';
            $db = new DB();
            require_once $_SERVER['DOCUMENT_ROOT'] .'/db/data.php';
            $dataStore = new Data($db);

            $getUserDetails = $dataStore->checkForgottenDetails($_POST['email']);
			$getUserDetails = $getUserDetails[0];

            if (is_array($getUserDetails)) {
                $fname = $getUserDetails['fname'];
                $email = $getUserDetails['email'];

                //reset code
                $confirmation_code = md5(microtime());

                //add code to database
//                $dataStore->insertResetCode($getUserDetails['uid'],$confirmation_code);

                require($_SERVER['DOCUMENT_ROOT'] .'/class/sendMail.php');

                $from_address = 'noreply@topazmarinesafetyapp.com';

                $from_group = 'Forgotten';
                $article_date = date('l, jS F y');

				//Email Subjet
				$subject = 'Topaz Safety App Forgotten Details';

                //Fixture Details Array
                $email_vars = array('title' => 'Topaz Safety App Forgotten Details', 'code' => $confirmation_code, 'fname' => $fname);

				//Build Up email details
				$registars_details = array();
				$registars_details[0]['uid'] = $getUserDetails['uid'];
				$registars_details[0]['email'] = $email;
				$registars_details[0]['type'] = $from_group;

                //Do oop function
                $myMail = new Email('[TopazMarineSafetyapp] Forgotten Details', $subject, $from_group, $from_address, $article_date, $email_vars, $registars_details);
                //$subject, $title, $from_group, $from, $email_date, $email_vars,$email_notifications
                //(Email Subject, Emails Title, email type aka which template to use, From Address, Email Date)
                $myMail->createEmailVars();
                $myMail->send();

				$errors['good'] = 'Mail has been sent, please make sure you check your Junk Mail';
            }else{
				$errors['bad'] = 'Whoops, no email was found using this email address';
			}
        }
		header('Content-Type: application/javascript');
		print json_encode($errors);
    }

}