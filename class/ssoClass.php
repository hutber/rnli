<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hutberj
 * Date: 30/01/12
 * Time: 22:20
 * To change this template use File | Settings | File Templates.
 */
class singleSignOn
{

    protected $ssoDetails;

    function __construct($ssoDetails)
    {
        require_once '../db/db.php';
        $this->db = new DB();

        require_once '../db/db/DBregistration.php';
        $this->dataStore = new DBregistration($this->db);

        //Set up check access
        require_once '../class/siteLoginClass.php';
        $this->logIn = new siteLogin();

        //Set up check access
        require_once '../class/regClass.php';
        $this->reg = new reg();

        //get encryption class
        require('../class/easyMcrypt.php');

        $this->ssoDetails = $ssoDetails;
        $this->userDetails = $this->getUserDetails();
        $this->emailDetails = $this->dataStore->checkUserEmail($this->ssoDetails['profile']['email']);

        //Run the function to check if the user is registered or not.
        $this->signInOrRegister();
    }

    function getUserDetails () {
        $userDetails = array();
        $identifier = $this->ssoDetails['profile']['identifier'];

        switch ($this->ssoDetails['profile']['providerName']){
            case 'Facebook';
                $uname = explode("=", $identifier);
                //set Email
                $userDetails['email'] = $this->ssoDetails['profile']['email'];
                //set Fname
//                $userDetails['fname'] = $this->ssoDetails['profile']['name']['givenName'];
                //set Sname
//                $userDetails['sname'] = $this->ssoDetails['profile']['name']['familyName'];
                //set gender
                $userDetails['gender'] = $this->ssoDetails['profile']['gender'];
                $userDetails['uname'] = $this->ssoDetails['profile']['email'];
                $provider = "Facebook";
                break;
            case 'Google';
                $uname = explode("profiles/", $identifier);
                $provider = "Google";
                break;
            case 'Yahoo!';
                $uname = explode("a/", $identifier);
                $provider = "Yahoo!";
                break;
            case 'Windows Live';
                $uname = explode("cid-", $identifier);
                $provider = "Windows Live";
                break;
            case 'Twitter';
                $uname = explode("=", $identifier);
                $name = explode(" ", $this->ssoDetails['profile']['name']['formatted']);
                //set Fname
//                $userDetails['fname'] = $name[0];
                //set Sname
//                $userDetails['sname'] = $name[1];
                //set email to nothing
                $userDetails['email'] = 'na';
                //set email to nothing
                $userDetails['gender'] = 'na';
                $userDetails['uname'] = strtolower($this->ssoDetails['profile']['preferredUsername']);


                $provider = "Twitter";
                break;
        }

        //check database and see if desired username is taken, if it isn't set it otherwise use ID from social network
//        if($this->dataStore->regSeeUsers($this->ssoDetails['profile']['preferredUsername'])==0){
//            //set Uname
//            $userDetails['uname'] = strtolower($this->ssoDetails['profile']['preferredUsername']);
//        }
//        elseif($this->emailDetails['count']==0){
//            //set Uname
//            $userDetails['uname'] = $this->ssoDetails['profile']['email'];
//        }else{
//            //Set Userame
//            if(isset($uname)) $userDetails['uname'] = $uname[1];
//        }
        //set DOB
        if($this->ssoDetails['profile']['birthday']!=""){
            $userDetails['dob'] = $this->ssoDetails['profile']['birthday'];
        }else{
            $userDetails['dob'] = '1970-01-01';
        }
        //set confirmCode
        $userDetails['confirmCode'] = md5(microtime());
        //set pword
        $userDetails['pword'] = substr(md5(microtime()), 0, 6);
        if(isset($provider)){
            //set provider
            $userDetails['provider'] = $provider;
        }else{
            $userDetails['provider'] = 'UnKnown';
        }

        //Finally encrypt all data
        $userDetails['uname'] = easyMcrypt::encrypt($userDetails['uname']);
        if($userDetails['email']!="na"){
            $userDetails['email'] = easyMcrypt::encrypt($userDetails['email']);
        }
        return $userDetails;
    }

    function areWeRegistered () {
        if($this->userDetails['uname']==''){
            return 0;
        }else{
//            if($this->emailDetails['count']!=0){
//                return $this->emailDetails['details']['uname'];
//            }else{
                return $this->dataStore->regSeeUsers($this->userDetails['uname']);
//            }
        }
    }

    function signInOrRegister () {
        if($this->areWeRegistered()) {
            //if we are in the loop then the user is registered so sign them in
            $this->logIn->persistent($this->userDetails['uname']);
            header('Location:/');
        }else{
            //register the user
            $this->reg->registerUser($this->userDetails);
        }
    }

}
