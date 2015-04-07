 <?php

class takeGPS extends Controller {
    function post()
    {

        require_once SITEROOT.'/db/db.php';
        $db = new DB();

        require_once SITEROOT.'/db/types/DBApi.php';
        $dataStore = new DBApi($db);

        //Variables
        $dataToReturn = array();
        $lat = $_POST['lat'];
        $long = $_POST['long'];

        $dataStore -> addGPS($lat, $long);

        header('Content-type: application/javascript');
        print json_encode($dataToReturn);
    }
}