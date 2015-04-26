 <?php

class returnData extends Controller {
    function get()
    {

        header('Content-type: application/javascript');

        function get_http_response_code($url) {
            $headers = get_headers($url);
            return substr($headers[0], 9, 3);
        }

        function convertWeatherType($txt){
            switch ($txt) {
                case 0:
                    return"clearnight";
                    break;
                case 1:
                    return"sunnyday";
                    break;
                case 2:
                    return"partlycloudynight";
                    break;
                case 3:
                    return"partlycloudydata";
                    break;
                case 4:
                    return"notused";
                    break;
                case 5:
                    return"mist";
                    break;
                case 6:
                    return"fog";
                    break;
                case 7:
                    return"cloudy";
                    break;
                case 8:
                    return"overcast";
                    break;
                case 9:
                    return"lightrainshowernight";
                    break;
                case 10:
                    return"lightrainshowerday";
                    break;
                case 11:
                    return"drizzle";
                    break;
                case 12:
                    return"lightrain";
                    break;
                case 13:
                    return"heavyrainshowernight";
                    break;
                case 14:
                    return"heavyrainshowerday";
                    break;
                case 15:
                    return"heavyrain";
                    break;
                case 16:
                    return"sleetshowernight";
                    break;
                case 17:
                    return"sleetshowernight";
                    break;
                case 18:
                    return"Sleet";
                    break;
                case 19:
                    return"hailshowernight";
                    break;
                case 20:
                    return"hailshowerday";
                    break;
                case 21:
                    return"hail";
                    break;
                case 22:
                    return"lightsnowshowernight";
                    break;
                case 23:
                    return"lightsnowshowerday";
                    break;
                case 24:
                    return"lightsnow";
                    break;
                case 25:
                    return"heavysnowshowernight";
                    break;
                case 26:
                    return"heavysnowshowerday";
                    break;
                case 27:
                    return"heavysnow";
                    break;
                case 28:
                    return"thundershowernight";
                    break;
                case 29:
                    return"thundershowerday";
                    break;
                case 30:
                    return"thunder";
                    break;
                default:
                    return"Not available";
            }
        };

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
                $times = file('http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/capabilities?res=3hourly&key=' . $key);
                $times = json_decode($times[0]);

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
//$threehourData = json_decode($weatherReports['threehour']);
//$threehourWeather = json_decode($dataFeed['threehour'])->SiteRep->DV->Location->Period[0]->Rep;
//$threehourTime = json_decode($dataFeed['threehour'])->SiteRep->DV->Location->Period[0]->value;


                //Build new compiled data from time
                if(isset($time)) {
                    foreach( $weatherReports as $key => $item) {
                        //Compiled Data
                        ${$key.'Weather'} = $item;
                        ${$key.'Time'} = $item;

                        $jsonItem = json_decode($item);
                        if($jsonItem->SiteRep->DV->Location) {
                            foreach ($jsonItem->SiteRep->DV->Location->Period as $key2 => $item2) {
                                if ($time == $item2->value) {
                                    ${$key.'Weather'} = $item2->Rep;
                                    ${$key.'Time'} = $item2->value;
                                    $timeTrue = true;
                                }
                            }
                        }
                        ${$key.'Data'} = json_decode($item);
                    }
                }

				//Now build tide data
				$tide = $dataStore->getTideInfo($siteID, $time );

				//turn data into something we can use
				$dataToReturn = array (

                    //Trip Details ------------------------------------------/
                    'time' => $threehourTime,
                    'timefail' => $timeTrue,
                    'tide' => $tide,
                    'area' => $threehourData->SiteRep->DV->Location->name,
					'country' => $threehourData->SiteRep->DV->Location->country,
					'continent' => $threehourData->SiteRep->DV->Location->continent,
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'dailyWeather' => $dailyWeather,
                    '3hourWeather' => $threehourWeather,
                    'hourlyWeather' => json_decode($hourlyWeather->SiteRep->Wx->Param),

                    //Sea Details-----------------------------------------/
					'seatemperature'=> $threehourWeather[0]->St,

                    //Weather Details-----------------------------------------/
                    'readingtime'=> $threehourWeather[0]->{'$'},
                    'winddirection'=> $threehourWeather[0]->D,
                    'dewpoint'=> $threehourWeather[0]->Dp,
                    'feelsliketemperature'=> $threehourWeather[0]->F,
                    'windgust'=> $threehourWeather[0]->G,
                    'humidity'=> $threehourWeather[0]->H,
                    'pressure'=> $threehourWeather[0]->P,
                    'precipitationprobability'=> $threehourWeather[0]->Pp,
                    'pressuretendency'=> $threehourWeather[0]->Pt,
                    'windspeed'=> $threehourWeather[0]->S,
                    'temperature'=> $threehourWeather[0]->T,
                    'maxUVindex'=> $threehourWeather[0]->U,
                    'visibility'=> $threehourWeather[0]->V,
                    'weathertype'=> $threehourWeather[0]->W,
                    'weathertypetext'=> convertWeatherType($threehourWeather[0]->W),
                    'waveheight'=> $threehourWeather[0]->Wh,
                    'waveperiod'=> $threehourWeather[0]->Wp,


                    //Information ------------------------------------------/
                    'swell'=> null,
					'key' => $threehourData->SiteRep->Wx->Param
                );
            }


            print json_encode($dataToReturn);
//            echo '________________________________________________<br>';
//            c($dataFeed);
        }else{
            print $error;
        }
    }
}