<?php

class manage extends Controller {
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
	function get($type, $data=array()) {

//		$this->isSecure();
		$users = $this->login->dataStore->getUsers();
		$this->view('manage.html', $users);
    }

	function post($type, $data=array()) {

//		$this->isSecure();
		$users = $this->login->dataStore->approveUsers($_POST['uid'], $_POST['confirmed']);
		$thisUser = $this->login->dataStore->adminUserLookUp($_POST['uid'])[0];

		if($_POST['confirmed']==1){
			require_once SITEROOT.'/class/sendMail.php';

			$from_address = 'noreply@mayfieldafc.com';

			$from_group = 'Approvals';
			$article_date = date('l, jS F y');

			//Email Subjet
			$subject = 'Your RNLI Account has been approved';

			//Email Details to inset into the email Array
			$email_vars = array('title' => 'Your RNLI Account has been approved', 'fname' => $thisUser['fname'], 'email' => $thisUser['email'], 'username' => $thisUser['username']);

			//Build Up email details
			$registars_details = array();
			$registars_details[0]['uid'] = $thisUser['uid'];
			$registars_details[0]['email'] = $thisUser['email'];
			$registars_details[0]['username'] = $thisUser['username'];
			$registars_details[0]['type'] = 'Approved';

			//Do oop function
			$myMail = new Email('[RNLI] Approval Complete', $subject, $from_group, $from_address, $article_date, $email_vars, $registars_details);
			//$subject, $title, $from_group, $from, $email_date, $email_vars,$email_notifications
			//(Email Subject, Emails Title, email type aka which template to use, From Address, Email Date)
			$myMail->createEmailVars();
			$myMail->send();
		}
		print json_encode($users);
		exit;
    }
}