 <?php

class threehour extends Controller {
    function get()
    {

        header('Content-type: application/javascript');

        require_once SITEROOT.'/db/db.php';
        $db = new DB();

        require_once SITEROOT.'/db/types/DBApi.php';
        $dataStore = new DBApi($db);

        //Variables
        $key = '9ef3f3a2-f189-4cb4-a0c4-31b52691f81f';
        $latitude = $_GET['latitude'];
        $longitude = $_GET['longitude'];
        $dataToReturn = array();
        if(isset($_GET['type'])){
            $type = $_GET['type'];
        }else{
            $type = 'wxfcs';
        };
        $error = array(
            'status'=>'fail',
            'message'=>'Couldn\'t find location, please try again'
        );

        if($latitude !="" && $longitude !="") {
            //Get nearest Location Site
            $siteInfo = $dataStore->getArea($latitude, $longitude);
            $siteID = $siteInfo[0]['id'];

            //get data from feed
            $url = 'http://datapoint.metoffice.gov.uk/public/data/val/' . $type . '/all/json/' . $siteID . '?res=3hourly&key=' . $key;
			$curl_handle=curl_init();
			curl_setopt($curl_handle, CURLOPT_URL,$url);
			curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 2);
			curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($curl_handle, CURLOPT_USERAGENT, 'RNLI Safety App');
			$query = curl_exec($curl_handle);
			curl_close($curl_handle);

            function get_http_response_code($url) {
                $headers = get_headers($url);
                return substr($headers[0], 9, 3);
            }

            if($query == "200"){
				$dataToReturn = $error;
            }else{
                $dataFeed = json_decode($query);
				
				//turn data into something we can use
				$dataToReturn = array(
					'id' => $dataFeed->SiteRep->DV->Location->i,
					'latitude' => $latitude,
					'longitude' => $longitude,
					'area' => $dataFeed->SiteRep->DV->Location->name,
					'country' => $dataFeed->SiteRep->DV->Location->country,
					'continent' => $dataFeed->SiteRep->DV->Location->continent,
					'weather' => $dataFeed->SiteRep->DV->Location->Period,
					'key' => $dataFeed->SiteRep->Wx->Param
				);
            }

            print json_encode($dataToReturn);
        }else{
            print $error;
        }
    }
}