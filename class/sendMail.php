<?php 

class Email {

    public $subject;
    public $title;
    public $from_group;
    public $from;
    public $email_date;
    public $email_vars;
    public $email_notifications;

    function __construct($subject, $title, $from_group, $from, $email_date, $email_vars,$email_notifications) {
        $this->subject = $subject;
        $this->title = $title;
        $this->from_group = $from_group;
        $this->from = $from;
        $this->email_date = $email_date;
        $this->email_vars = $email_vars;
        $this->email_notifications = $email_notifications;
    }

    private function buildMatchBody() { //Build the html from a template depending on the from_group

        //Grab html template
        if($_SERVER['REMOTE_ADDR']=='127.0.0.1') {
            $this->email_message = file_get_contents('views/emails/'.$this->from_group.'.html');
        }else {
            $this->email_message = file_get_contents('/var/www/rnli.hutber.com/views/emails/'.$this->from_group.'.html');
        }
        //Body Replaces
        $this->email_message = str_replace('%%title%%', $this->subject, $this->email_message);
        $this->email_message = str_replace('%%date%%', $this->email_date, $this->email_message);
    }


    function createEmailVars() {
        //Edit Emails Body
        $this->buildMatchBody(); //We build up the email before we change the settings from the Array

        foreach ($this->email_vars as $key=>$value) {
            //Body Replaces
            $value = stripslashes($value);
            $value =  (str_replace('\\', '', $value));
            if($key=='body'){
                $this->email_message = str_replace('%%'.strtolower($key).'%%', nl2br($value), $this->email_message);
            }else{
                $this->email_message = str_replace('%%'.strtolower($key).'%%', $value, $this->email_message);
            }
        }

    }

    function send() {
            //Loop through all the matching results for users
            foreach ($this->email_notifications as $value) {

                require_once SITEROOT.'/db/db.php';
                $db = new DB();
                require_once SITEROOT.'/db/types/DBemail.php';
                $dataStore = new DBemail($db);

                //insert email notification
                $dataStore->insertEmail($value['uid'],$value["email"],$value["type"]);

                //Email Vars
                $email_to = $value["email"];

                // To send HTML mail, the Content-type header must be set
                //$headers .= 'Content-type: text/html; charset=iso-8859-1'."\r \n";
                //$headers = 'MIME-Version: 1.0'."\r \n";
                // From header
                $headers = 'From: RNLI <'.$this->from.'>'."\r\n";
                //$headers .= "MIME-Version: 1.0\r\n";
                $headers .= 'Content-type: text/plain; charset=UTF-8'."\r \n";
                //$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                $headers .= "Content-Transfer-Encoding: 7bit;\r\n\r\n";
                //$headers .= "\r\n";

                //Email Senders
                if($_SERVER['REMOTE_ADDR']!='127.0.0.1') {
                    ini_set("sendmail_from", $this->from);
                    mail($email_to, $this->subject, $this->email_message, $headers);
                    mail('jamie@hutber.com', $this->subject, $this->email_message, $headers);
//                    echo $this->email_message;
                }else{
//                    echo $this->email_message;
                }
            }
    }

}