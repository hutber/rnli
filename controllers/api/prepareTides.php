 <?php

class prepareData extends Controller {
    function get()
    {

        require_once SITEROOT.'/db/db.php';
        $db = new DB();

        require_once SITEROOT.'/db/types/DBApi.php';
        $dataStore = new DBApi($db);

        $data = json_decode(file_get_contents(SUPERBASE.'/config/sitelist.json'));
//        echo json_encode($data->Locations->Location);exit;
        $data = $data->Locations->Location;

        //First remove all data in DB
        $dataStore->removeSites();

        foreach($data as $key=>$val){
            $dataStore->insertSites(
                $val->id,
                $val->elevation,
                $val->latitude,
                $val->longitude,
                $val->name,
                $val->region,
                $val->unitaryAuthArea
            );
        }
    }
}