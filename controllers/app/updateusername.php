<?php

class updateusername extends Controller {

	function get($type, $data=array()) {
		require_once '../db/db.php';
		$db = new DB();

		require_once '../db/data.php';
		$dataStore = new Data($db);

		$users = $dataStore->getUsers();

		//Decrypt username from the user
		require('../class/easyMcrypt.php');
		foreach($users as $key => $value){
			$users[$key]['uname'] = easyMcrypt::decrypt($users[$key]['uname']);
			$users[$key]['pword'] = easyMcrypt::decrypt($users[$key]['uname']);
//			$uname = easyMcrypt::decrypt($users[$key]['uname']);
//			echo '<b>'.$users[$key]['uid'].':</b> '.$uname.'<br>';
//			$uname = easyMcrypt::encrypt($users[$key]['uname']);
//			echo $uname.'<br>___________________________________________<br>';
			
			//$dataStore->updateusernames($users[$key]['uid'], $uname);
		}
		c($users);

    }
}


//if($tmpName!=$uname){
//	$tmpName = $uname;
//}else {
//	echo '<b>'.$key.':</b> '.$uname.'<br>';
//}