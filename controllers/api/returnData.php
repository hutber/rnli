 <?php

class returnData extends Controller {
    function get()
    {

        function get_http_response_code($url) {
            $headers = get_headers($url);
            return substr($headers[0], 9, 3);
        }

        require_once SITEROOT.'/db/db.php';
        $db = new DB();

        require_once SITEROOT.'/db/types/DBApi.php';
        $dataStore = new DBApi($db);

        //Variables
        $key = '9ef3f3a2-f189-4cb4-a0c4-31b52691f81f';
        $time = $_GET['time'];
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
            $desiredTime = '';

            if(isset($time)) {
                //checktimes before we do anything else
                $times = json_decode(file('http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/capabilities?res=3hourly&key=' . $key)[0]);
                $desiredTime = '&time='.$times->Resource->dataDate;
            }

            //get data from feed
            $hourly = 'http://datapoint.metoffice.gov.uk/public/data/val/wxobs/all/json/' . $siteID . '?res=hourly&key='.$key.$desiredTime;
            $threehour = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/' . $siteID . '?res=3hourly&key='.$key;
            $daily = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/' . $siteID . '?res=daily&key='.$key;
            $sea = 'http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/' . $siteID . '?res=hourly&key='.$key;
            $weatherReports = array();

            $nodes = array('hourly'=>$hourly,'threehour'=>$threehour,'daily'=>$daily,'sea'=>$sea);

            $curl_arr = array();
            $master = curl_multi_init();

            foreach($nodes as $key => $item){
                $url =$nodes[$key];
                $curl_arr[$key] = curl_init($url);
                curl_setopt($curl_arr[$key], CURLOPT_RETURNTRANSFER, true);
                curl_multi_add_handle($master, $curl_arr[$key]);
            }

            do {
                curl_multi_exec($master,$running);
                //$query = curl_exec($curl_handle);
            } while($running > 0);

            foreach($nodes as $key => $item){
                $weatherReports[$key] = curl_multi_getcontent  ( $curl_arr[$key]  );
            }


            if(count($weatherReports) == 0){
				$dataToReturn = $error;
            }else{

                //Raw Data
                $dataFeed = $weatherReports;
//                c($weatherReports);
                $threeHourData = json_decode($weatherReports['threehour']);

                //Compiled Data
                $threeHourWeather = json_decode($dataFeed['threehour'])->SiteRep->DV->Location->Period[0]->Rep;
                $threeHourTime = json_decode($dataFeed['threehour'])->SiteRep->DV->Location->Period[0]->value;

                //Build new compiled data from time
                if(isset($time)) {
//                    c($threeHourData->SiteRep->DV->Location->Period);
                    foreach($threeHourData->SiteRep->DV->Location->Period as $key => $item){
                        if($time == $item->value){
                            $threeHourWeather = $item->Rep;
                            $threeHourTime = $item->value;
                            $timeTrue = true;
                        }
                    }
                }

//                c( $dataFeed['threehour']);
				//turn data into something we can use
				$dataToReturn = array (
                    'time' => $threeHourTime,
                    'timefail' => $timeTrue,
                    'area' => $dataFeed['threehour']->SiteRep->DV->Location->name,
					'country' => $dataFeed['threehour']->SiteRep->DV->Location->country,
					'continent' => $dataFeed['threehour']->SiteRep->DV->Location->continent,
                    'readingtime'=> $threeHourWeather[0]->{'$'},
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'winddirection'=> $threeHourWeather[0]->D,
                    'dewpoint'=> $threeHourWeather[0]->Dp,
                    'feelsliketemperature'=> $threeHourWeather[0]->F,
                    'windgust'=> $threeHourWeather[0]->G,
                    'humidity'=> $threeHourWeather[0]->H,
                    'pressure'=> $threeHourWeather[0]->P,
                    'precipitationprobability'=> $threeHourWeather[0]->Pp,
                    'pressuretendency'=> $threeHourWeather[0]->Pt,
                    'windspeed'=> $threeHourWeather[0]->S,
                    'seatemperature'=> $threeHourWeather[0]->St,
                    'temperature'=> $threeHourWeather[0]->T,
                    'maxUVindex'=> $threeHourWeather[0]->U,
                    'visibility'=> $threeHourWeather[0]->V,
                    'weathertype'=> $threeHourWeather[0]->W,
                    'waveheight'=> $threeHourWeather[0]->Wh,
                    'waveperiod'=> $threeHourWeather[0]->Wp,
                    'swell'=> null,
					'key' => $dataFeed['threehour']->SiteRep->Wx->Param
                );
            }

//            header('Content-type: application/javascript');

            print json_encode($dataToReturn);
//            echo '________________________________________________<br>';
//            c($dataFeed);
        }else{
            print $error;
        }
    }
}