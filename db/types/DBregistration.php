<?php

include_once SITEROOT.'/db/data.php';

class DBregistration extends Data {

    /**************************
     * Registration Queries
     **************************/

    function regSeeUsers($value)
    {
        $sql = sprintf(
            "SELECT uname FROM users WHERE uname='%s';",
            $this->db->escape($value)
        );
        return $this->db->countRows($this->db->query($sql));
    }

    function getCurrentUsername($value)
    {
        $sql = sprintf(
            "SELECT uname FROM users WHERE sessionCheck='%s';",
			$this->db->escape($value)
        );
        return $this->db->getRow($this->db->query($sql));
    }

    function getCurrentPword($value)
    {
        $sql = sprintf(
            "SELECT pword FROM users WHERE sessionCheck='%s';",
			$value
        );
        return $this->db->get($sql);
    }

    function grabLastUser()
    {
        $sql = sprintf(
            "SELECT uid, email, fname FROM users ORDER BY regdate DESC LIMIT 1;"
        );
        return $this->db->get($sql);
    }

    function insertUsers($fname, $sname, $uname, $email, $pword, $device, $version, $confirmed)
    {
        $user_ip = $_SERVER['REMOTE_ADDR'];
        $sql = sprintf(
            "INSERT INTO `users` (
            `fname` ,
            `sname` ,
            `username` ,
            `email` ,
            `pword` ,
            `device` ,
            `version` ,
            `ip`,
            `confirmed`
            )
            VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s'
            );",
			$fname,
			$sname,
			$uname,
			$this->db->escape($email),
            $pword,
            $device,
            $version,
            $user_ip,
			$confirmed);
        return $this->db->query($sql);
    }

    function updateUsers($fname, $sname, $email, $number, $fishingtype, $pword, $device, $version, $pkey)
    {
        $sql = sprintf(
            "UPDATE `users`
			SET `fname` = '%s',
				`sname` = '%s',
				`email` = '%s',
				`pnumber` = '%s',
				`fishingtype` = '%s',
				`pword` = '%s',
				`device` = '%s',
				`version` = '%s'
			WHERE `users`.`sessionCheck` = '%s' LIMIT 1;",
			$fname,
			$sname,
			$this->db->escape($email),
			$number,
			$this->db->escape($fishingtype),
			$pword,
			$device,
			$version,
			$pkey
		);

        $this->db->query($sql);
    }

    function checkUserspword($details)
    {
        $sql = sprintf(
            "SELECT count(*) AS number FROM users WHERE uid=%d AND pword='%s' AND sessionCheck='%s';",
            $details['uid'],
            $details['pword'],
            $details['sessionCheck']);

        return $this->db->getRow($this->db->query($sql));
    }

    function forcepwordCheck($details)
    {
        $sql = sprintf(
            "SELECT pword FROM users WHERE uid=%d AND sessionCheck='%s';",
            $details['uid'],
            $details['sessionCheck']);
        return $this->db->get($sql);
    }

    function confirmUser($code)
    {

        $sql = sprintf("SELECT confirmed FROM users WHERE confirmationCode = '%s';",$code);
        $result = $this->db->get($sql);
		$result = $result[0];
        if ($result['confirmed'] != '' && $result['confirmed'] != 1 && count($result) == 1) {
            $sql = sprintf(
                "UPDATE users SET confirmed = 1, level = 1 WHERE confirmationCode = '%s';",$code
            );
            $this->db->query($sql);
        } elseif (count($result) == 0) {
            return 'no valid code';
        } else {
            return 'already Reg';
        }
    }

    //grab user email adress
    function checkUserEmail($email)
    {
        $sql = sprintf("SELECT uname,uid,email FROM users WHERE email='%s'", $this->db->escape($email));
//        return array('count' => $this->db->countRows($this->db->query($sql)), 'details' => $this->db->getRows($this->db->query($sql)));
        return $this->db->query($sql);
    }

    //grab user email adress
    function checkForgottenDetails($email)
    {
        $sql = sprintf("SELECT uname,uid,email,pword FROM users WHERE email='%s'", $this->db->escape($email));

        return array('count' => $this->db->countRows($this->db->query($sql)), 'details' => $this->db->getRows($this->db->query($sql)));
    }


    //yet to work out what this is for
    function adminEmailCheck($email)
    {
        $sql = sprintf(
            "SELECT email FROM users WHERE email='%s';",$this->db->escape($email)
        );
        return $this->db->countRows($this->db->query($sql));
    }
    //yet to work out what this is for
    function getCurrentEmailOfUser($uid)
    {
        $sql = sprintf(
            "SELECT email FROM users WHERE uid='%s';",$this->db->escape($uid)
        );
        return $this->db->get($sql);
    }

    //yet to work out what this is for
    function adminUsernameCheck($email)
    {
        $sql = sprintf(
            "SELECT username FROM users WHERE username='%s';",$this->db->escape($email)
        );
        return $this->db->countRows($this->db->query($sql));
    }


    //check details via session if email is taken
    function sessionCheckEmailCheck($email, $sessionCheck)
    {
        $sql = sprintf(
            "SELECT email FROM users WHERE email='%s' AND sessionCheck='%s';",$this->db->escape($email),$sessionCheck
        );
        return $this->db->countRows($this->db->query($sql));
    }


}
