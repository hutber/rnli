 <?php

class returnData extends Controller {
    function get()
    {

        function get_http_response_code($url) {
            $headers = get_headers($url);
            return substr($headers[0], 9, 3);
        }

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
            $hourly = 'http://datapoint.metoffice.gov.uk/public/data/val/wxobs/all/json/' . $siteID . '?res=hourly&key='.$key;
            $threehour = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/' . $siteID . '?res=3hourly&key='.$key;
            $daily = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/' . $siteID . '?res=daily&key='.$key;
            $sea = 'http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/' . $siteID . '?res=hourly&key='.$key;
            $weatherReports = array();

            $nodes = array($hourly, $threehour, $daily, $sea);
            $node_count = count($nodes);

            $curl_arr = array();
            $master = curl_multi_init();

            for($i = 0; $i < $node_count; $i++)
            {
                $url =$nodes[$i];
                $curl_arr[$i] = curl_init($url);
                curl_setopt($curl_arr[$i], CURLOPT_RETURNTRANSFER, true);
                curl_multi_add_handle($master, $curl_arr[$i]);
            }

            do {
                curl_multi_exec($master,$running);
                //$query = curl_exec($curl_handle);
            } while($running > 0);

            for($i = 0; $i < $node_count; $i++)
            {
                $weatherReports[$i] = curl_multi_getcontent  ( $curl_arr[$i]  );
            }


            if(count($weatherReports) == 0){
				$dataToReturn = $error;
            }else{
//                $dataFeed = json_decode($query);
//                $weather = $dataFeed->SiteRep->DV->Location->Period[0]->Rep;
//
//				//turn data into something we can use
//				$dataToReturn = array (
//                    'area' => $dataFeed->SiteRep->DV->Location->name,
//					'country' => $dataFeed->SiteRep->DV->Location->country,
//					'continent' => $dataFeed->SiteRep->DV->Location->continent,
//                    'readingtime'=> $weather[0]->{'$'},
//                    'latitude' => $latitude,
//                    'longitude' => $longitude,
//                    'winddirection'=> $weather[0]->D,
//                    'dewpoint'=> $weather[0]->Dp,
//                    'feelsliketemperature'=> $weather[0]->F,
//                    'windgust'=> $weather[0]->G,
//                    'humidity'=> $weather[0]->H,
//                    'pressure'=> $weather[0]->P,
//                    'precipitationprobability'=> $weather[0]->Pp,
//                    'pressuretendency'=> $weather[0]->Pt,
//                    'windspeed'=> $weather[0]->S,
//                    'seatemperature'=> $weather[0]->St,
//                    'temperature'=> $weather[0]->T,
//                    'maxUVindex'=> $weather[0]->U,
//                    'visibility'=> $weather[0]->V,
//                    'weathertype'=> $weather[0]->W,
//                    'waveheight'=> $weather[0]->Wh,
//                    'waveperiod'=> $weather[0]->Wp,
//                    'swell'=> null,
//					'key' => $dataFeed->SiteRep->Wx->Param
//                );
            }

            print json_encode($weatherReports);
        }else{
            print $error;
        }
    }
}