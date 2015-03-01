 <?php

class returnData extends Controller {
    function get()
    {

        require_once $_SERVER['DOCUMENT_ROOT'] .'/db/db.php';
        $db = new DB();

        require_once $_SERVER['DOCUMENT_ROOT'] .'/db/types/DBApi.php';
        $dataStore = new DBApi($db);

        //Variables
        $key = '9ef3f3a2-f189-4cb4-a0c4-31b52691f81f';
        $lat = $_GET['lat'];
        $long = $_GET['long'];
        $dataToReturn = [];
        if(isset($_GET['type'])){
            $type = $_GET['type'];
        }else{
            $type = 'wxfcs';
        };

        //Get nearest Location Site
        $siteInfo = $dataStore->getArea($lat, $long);
        $siteID = $siteInfo[0]['id'];

        //get data from feed
        $dataFeed = json_decode(file_get_contents('http://datapoint.metoffice.gov.uk/public/data/val/'.$type.'/all/json/'.$siteID.'?res=3hourly&key='.$key));

        //turn data into something we can use
        $dataToReturn = [
            'area' => $dataFeed->SiteRep->DV->Location->name,
            'country' => $dataFeed->SiteRep->DV->Location->country,
            'continent' => $dataFeed->SiteRep->DV->Location->continent,
            'weather' => $dataFeed->SiteRep->DV->Location->Period[0]->Rep[0]
        ];

        header('Content-type: application/javascript');
        print_r($dataToReturn);
//        print_r($dataFeed->SiteRep->DV->Location);
//        echo json_encode($info[0]);
    }
}