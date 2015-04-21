<?php

/* Table of Contents
==================================================
    #Contents
		#User Log in querys
		#Varification Queries
		#Account Settings
		#Lost Login Recovery
*/

class Data
{

	protected $db;

	function __construct($db)
	{
		$this->db = $db;
	}

	function approveUsers($uid, $val) //update the users password
	{
		$sql = sprintf("UPDATE  `topazmar_topaz`.`users` SET  `confirmed` =  '%s' WHERE  `users`.`uid` =%d;",$val,  $uid);
		return $this->db->get($sql);
	}
	function getUsers() //update the users password
	{
		$sql = sprintf("SELECT uid, fname, sname, username, email, confirmed, regdate from users order by confirmed, regdate;");
		return $this->db->get($sql);
	}

	function getObservations($start, $end) //update the users password
	{
		if($start!=""){
			$datevar = "AND b.submitdate >= '".$start." 00:00:00' AND  b.submitdate <= '".$end." 00:00:00'";
		}
		$sql = sprintf("SELECT b.id, u.fname, u.sname, b.type, b.comment, b.region, b.vessel, b.submitdate, (SELECT GROUP_CONCAT(observation) FROM observationdetails bd WHERE b.id = bd.oid) as observation FROM observation b, users u WHERE b.uid=u.uid %s order by b.id;", $datevar);
		return $this->db->get($sql);
	}

	/*=================================================================================================
		* # Account
		===============================================================================================*/
	// #User Log in querys -------------------------------------------------------------------

	function checkUser($email, $pword)
	{ //Check username via username
		$sql = sprintf(
			"SELECT uid,fname,sname,email,version,confirmed,regdate, profileimage
			FROM users
			WHERE email='%s' AND pword = '%s'
			GROUP BY uid;", $this->db->escape($email), $this->db->escape($pword));
		return $this->db->getFirst($sql);
	}
	function checkUserName($email, $pword)
	{ //Check username via username
		$sql = sprintf(
			"SELECT uid,fname,sname,email,version,confirmed,regdate
			FROM users
			WHERE username='%s' AND pword = '%s'
			GROUP BY uid;", $this->db->escape($email), $this->db->escape($pword));
		return $this->db->getFirst($sql);
	}

	function checkSessUser($sessionCheck)
	{ //Check username via username
		$sql = sprintf(
			"SELECT uid,email,confirmed,confirmationCode,level,pword
			FROM users
			WHERE sessionCheck='%s'
			GROUP BY uid;", $sessionCheck);
		return $this->db->query($sql);
	}

	function forceCheckUser($email)
	{ //Get all users details back from sessioncheck alone...
		$sql = sprintf(
			"SELECT uid,email,confirmed,confirmationCode,level,pword
			FROM users
			WHERE email='%s'
			GROUP BY uid;", $this->db->escape($email));
		return $this->db->query($sql);
	}

	function logUser($uid, $type)
	{ //Add users latest logim
		$sql = sprintf("INSERT INTO members_log (uid,logtype,datelogged) VALUES (%d,%d,NOW());", $uid, $type);
		$this->db->query($sql);
	}

	function delUser($sessionCheck)
	{ //Add users latest logim
		$sql = sprintf("INSERT INTO bkusers SELECT d . * , CURRENT_DATE() FROM users d WHERE sessionCheck = '%s';", $sessionCheck);
		$this->db->query($sql);
		$sql = sprintf("DELETE FROM users WHERE `users`.`sessionCheck` = '%s';", $sessionCheck);
		$this->db->query($sql);
	}


	// #Varification Queries -------------------------------------------------------------------

	function checkLevel($sessionCheck = 0)
	{ //Check the users level via Session Check
		$sql = sprintf("SELECT level FROM users WHERE sessionCheck='%s' GROUP BY uid;", $sessionCheck);
		return $this->db->getFirst($sql);
	}

	function updateSessionCookie($email, $sessionCheck)
	{ //Update the session for the newly logged in users
		$sql = sprintf("UPDATE users SET sessionCheck = '%s' WHERE users.email ='%s';", $sessionCheck, $email);
		$this->db->query($sql);
	}

	function updatePhotoProfile($uid)
	{ //Update the session for the newly logged in users
		$sql = sprintf("UPDATE users SET profileimage = 1 WHERE users.uid = %d;", $uid);
		$this->db->query($sql);
	}

	function updateTripImage($uid)
	{ //Update the session for the newly logged in users
		$sql = sprintf("UPDATE  `rnli`.`trip` SET  `image` =  '1' WHERE  `trip`.`id` = %d;", $uid);
		$this->db->query($sql);
	}

	function updateUsersVersionNumber($sessionCheck, $version)
	{ //Update the session for the newly logged in users
		$sql = sprintf("UPDATE  users SET  `version` =  '%s' WHERE  `users`.`sessionCheck` = '%s';", $version, $sessionCheck);
		$this->db->query($sql);
	}

	function checkIsKeyUpToDate($uid, $sessionCheck)
	{ //Update the session for the newly logged in users
		$sql = sprintf("SELECT count(*) as current, uid FROM users WHERE sessionCheck = '%s' AND uid = %d;", $sessionCheck, $uid);
		$this->logUser($uid,0);
		return $this->db->get($sql);
	}


	// #Lost Login Recovery  -------------------------------------------------------------------

	function checkForgottenDetails($email)
	{ //Look up forgotten details for email resend of new users
		$sql = sprintf("SELECT uid,email,fname FROM users WHERE email='%s'", $this->db->escape($email));
		return $this->db->get($sql);
	}

	function getResetCode($code)
	{ //grab the new reset code
		$sql = sprintf("SELECT * FROM reset WHERE code='%s'", $code);
		return $this->db->get($sql);
	}

	// #Account Settings -------------------------------------------------------------------

	function updatePassword($pw, $uid) //update the users password
	{
		$sql = sprintf("UPDATE users SET pword = '%s' WHERE uid = %d LIMIT 1 ;", $this->db->escape($pw), $uid);
		$this->db->query($sql);
	}

	function getAllUserDetails($sessionCheck) //Grab all of the users details
	{
		$sql = sprintf("SELECT * FROM users WHERE sessionCheck='%s'", $sessionCheck);
		return $this->db->getRow($this->db->query($sql));
	}

	function adminUserLookUp($uid) //Grab all of the users details
	{
		$sql = sprintf("SELECT * FROM users WHERE uid='%s'", $uid);
		return $this->db->get($sql);
	}

	/*=================================================================================================
	* # Observations
	===============================================================================================*/

	function addObservation($uid, $type, $vessl, $region, $dateTime, $comment, $pkey) //Grab all of the users details
	{
		$sql = sprintf("INSERT INTO  `topazmar_topaz`.`observation` (
			`uid` ,
			`type` ,
			`vessel` ,
			`region` ,
			`submitdate`
			)
		VALUES (
			'%s',
			'%s',
			'%s',
			'%s',
			'%s'
		)", $uid, $type, $vessl, $region, $dateTime);
		$this->db->query($sql);

		$sql = sprintf("SELECT o.id FROM observation o, users u WHERE u.uid = o.uid AND u.sessionCheck='%s' ORDER BY o.id DESC LIMIT 1", $pkey);
		return $this->db->get($sql);
	}

	function insertObservationDetail($oid, $observation)
	{ //if the users has asked for a new code then we must insert this code
		$sql = sprintf("INSERT INTO observationdetails ( oid , observation ) VALUES ( '%s', '%s');", $oid, $observation);
		$this->db->query($sql);
	}

}
