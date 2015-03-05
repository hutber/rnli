 <?php

class returnData extends Controller {
    function get()
    {

        header('Content-type: application/javascript');

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
        $error = json_encode([
            'status'=>'fail',
            'message'=>'Couldn\'t find location, please try again'
        ]);

        if($lat !="" && $long !="") {
            //Get nearest Location Site
            $siteInfo = $dataStore->getArea($lat, $long);
            $siteID = $siteInfo[0]['id'];

            //get data from feed
            $url = 'http://datapoint.metoffice.gov.uk/public/data/val/' . $type . '/all/json/' . $siteID . '?res=3hourly&key=' . $key;

            function get_http_response_code($url) {
                $headers = get_headers($url);
                return substr($headers[0], 9, 3);
            }
            if(get_http_response_code($url) != "200"){
                print $error;
            }else{
                $dataFeed = json_decode(file_get_contents($url));
				//turn data into something we can use
				$dataToReturn = [
					'lat' => $lat,
					'long' => $long,
					'area' => $dataFeed->SiteRep->DV->Location->name,
					'country' => $dataFeed->SiteRep->DV->Location->country,
					'continent' => $dataFeed->SiteRep->DV->Location->continent,
					'weather' => $dataFeed->SiteRep->DV->Location->Period[0]->Rep[0],
					'key' => $dataFeed->SiteRep->Wx->Param
				];
            }

            print json_encode($dataToReturn);
        }else{
            print $error;
        }
    }
}