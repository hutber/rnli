<?php

class siteLogin
{

	public $db;
	public $dataStore;

    function __construct()
    {
//		c(isset($_SESSION));
//        if (!isset($_SESSION)) {
//            session_start();
//        }

		require_once SITEROOT .'/db/db.php';
		$this->db = new DB();
		require_once SITEROOT .'/db/types/DBuser.php';
		$this->dataStore = new DBuser($this->db);
    }

	public function check_user_details($post)
	{
		return $this->dataStore->checkUser($post['email'],$post['pword']);;
	}

	public function updatePhotoProfile($uid)
	{
		return $this->dataStore->updatePhotoProfile($uid);;
	}
	public function check_user_details_username($post)
	{
		return $this->dataStore->checkUserName($post['email'],$post['pword']);;

	}

	public function updateUsersVersion($privatekey, $version)
	{
		$this->dataStore->updateUsersVersionNumber($privatekey, $version);
	}

	public function getUsersContacts($uid)
	{
		return $this->dataStore->getContacts($uid);
	}

	public function getUsersNotes($uid)
	{
		return $this->dataStore->getNotes($uid);
	}

	private function convertToJson ($data, $type = ""){
		$workingData = array();
		foreach(explode(',',$data) as $value){
			$newTemp = explode(':',$value);
			if($type == "position"){
				if($newTemp[0] != "")
				$workingData[$value] = $value;
			}else{
				$workingData[$newTemp[1]] = (int)$newTemp[0];
			}
		}
		return json_encode($workingData);
	}

    private function user_log_in($post)
    {
		$isGood = $this->check_user_details($post);
		$checkUser = $isGood[1];
		$isGood = $isGood[0];

        if ($post['persistent'] == 1 && $isGood==1 && $checkUser['confirmed']!=0) {
            $time = (3600 * 24 * 30);
            setcookie("persistent", 1, time() + $time, '/');
            setcookie("7yv973niq0a", $post['uname'], time() + $time, '/');
        } else {
            $time = (3600);
        }

        if ($isGood==1) {
            if($checkUser['confirmed']==0){
                $this->checkConfirmation($checkUser['confirmed']);
            }else{
                $this->writeCookies($checkUser, $time);
            }
        }else{
            $checkUser['level'] = 0;
        }
//		c($checkUser);
        return $checkUser['level'];
    }

    public function persistent($userName=0)
    {
        $checkUser = $this->db->getRow($this->dataStore->forceCheckUser($userName));
        $time = (3600 * 24 * 30);
        //Check to see if we got a user from the forceCheckUser
        if($checkUser['uid']>0)
        $this->writeCookies($checkUser, $time);
    }

    private function writeSession($userDetails)
    {
        $_SESSION['level'] = $userDetails['level']; // check to see if the user is an admin
        $_SESSION['user_id'] = $userDetails['user_id']; // load user id to the session
        $_SESSION['confirmed'] = $userDetails['confirmed'];
        $_SESSION['site_style'] = $userDetails['site_style'];
        // checks to see if the user has confirmed/edited his user/team details
        $_SESSION['confirmation_code'] = $userDetails['confirmation_code'];
        $_SESSION['email'] = $userDetails['email'];
        $_SESSION['logincheck'] = 1; // Set the log in level to 1 so user log in things come up
        $_SESSION['logged_in'] = 1; // set the logged in status
    }

    private function writeCookies($userDetails, $time)
    {
        #setcookie("level", $userDetails['level'], time() + ($time), '/'); // check to see if the user is an admin
        $_SESSION['level'] = $userDetails['level']; // check to see if the user is an admin
//        setcookie("user_id", $userDetails['user_id'], time() + ($time), '/');
        setcookie("confirmed", $userDetails['confirmed'], time() + ($time), '/');
        // checks to see if the user has confirmed/edited his user/team details
        setcookie("confirmation_code", $userDetails['confirmation_code'], time() + ($time), '/');
//        setcookie("email", $userDetails['email'], time() + ($time), '/'); // check to see if the user is an admin
        setcookie("logincheck", 1, time() + ($time), '/'); // Set the log in level to 1 so user log in things come up
        setcookie("logged_in", 1, time() + ($time), '/'); // set the logged in status

		$this->createKey($userDetails, $time);
    }

	public function createToken($userDetails, $time)
	{
		$sessionCheck = md5(microtime());
			//echo $sessionCheck;
		setcookie("sessionCheck", $sessionCheck, time() + ($time), '/'); // set the logged in status
		$this->dataStore->updateSessionCookie($userDetails['email'], $sessionCheck);
		$this->dataStore->logUser($userDetails['uid'], 1);
		return $sessionCheck;
	}

}