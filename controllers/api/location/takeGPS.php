<?php

$messages = array();

class takeGPS extends Controller {

    function post (){
        if (isset($_POST)) {

                    //DB init
                    require_once SITEROOT. '/db/db.php';
                    $db = new DB();
                    require_once SITEROOT. '/db/types/DBApi.php';
                    $dataStore = new DBApi($db);


                    $lat = $_POST['lat'];
                    $long = $_POST['long'];

                    $dataStore -> addGPS($lat, $long);
            }
            header('Content-Type: application/javascript');
            print json_encode(['success']);
        }
    }

};