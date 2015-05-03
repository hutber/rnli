<?php

class reset extends controller
{

    function get($type, $errors = '')
    {

        require_once $_SERVER['DOCUMENT_ROOT'] .'/db/db.php';
        $db = new DB();
        require_once $_SERVER['DOCUMENT_ROOT'] .'/db/data.php';
        $dataStore = new Data($db);

        $codeDetails = $dataStore->getResetCode($_GET['c']);
		$codeDetails = $codeDetails[0];
        if ( is_array($codeDetails) && $_GET['c']=="" || strtotime($codeDetails['date']) < strtotime('-1 day')) {
            echo 'Sorry, something went wrong, please remember you only have 24 hours to change your password. Please get a new link from the app.';
//            header("location:/");
            exit;
        }
        $this->view('users/reset.html', array('errors' => $errors, 'title' => 'Reset Password'));

    }

    function post($type)
    {

        if (isset($_POST)) {
            require_once $_SERVER['DOCUMENT_ROOT'] .'/db/db.php';
            $db = new DB();
            require_once $_SERVER['DOCUMENT_ROOT'] .'/db/data.php';
            $dataStore = new Data($db);

            $codeDetails = $dataStore->getResetCode($_GET['c']);
			$codeDetails = $codeDetails[0];
			//|| strtotime($codeDetails['date']) < strtotime('-1 day')
            if ($codeDetails!="" && isset($_GET['c']) ) {
                require_once $_SERVER['DOCUMENT_ROOT'] .'/db/db.php';
                $db = new DB();
                require_once $_SERVER['DOCUMENT_ROOT'] .'/db/data.php';
                $dataStore = new Data($db);
				$error = true;

                $pword = $_POST['pw'];
                $c_pword = $_POST['cpw'];

                if ($pword == "") {
                    $data['pword'] = 'Please set a Password';
                    $error = false;
                }
                if ($c_pword == "") {
                    $data['c_pword'] = 'Please set a Confirmation Password';
                    $error = false;
                }

                if ($c_pword != $pword) {
                    $data['c_pword'] = 'Your passwords do not match';
                    $error = false;
                }

                //Checks that the pword isn't to small
//                if (strlen($pword) < 8 || strlen($pword) > 16) {
//                    $data['length'] = 'Your password is not right length - Please make sure it is between 8 to 16 characters';
//                    $error = false;
//                }
                //If no errors then add user to database and send confirmation email
                if ($error) {
//					require($_SERVER['DOCUMENT_ROOT'] .'/class/crypt.php');
//					$bcrypt = new Bcrypt(15);
//					$hash = $bcrypt->hash($pword);
                    $dataStore->updatePassword($pword, $codeDetails['uid']);
					echo 'Password Reset. Please login';
//					header("location:/");
					exit;
                }

            } else {
                echo 'Sorry, something went wrong, please remember you only have 24 hours to change your password. Please get a new link from the app.';
//                header("location:/");
                exit;
            }

            $this->get($type, $data);
        }
    }
}