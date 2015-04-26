 <?php

class prepareTides extends Controller {
    function get()
    {

        require_once SITEROOT.'/db/db.php';
        $db = new DB();

        require_once SITEROOT.'/db/types/DBApi.php';
        $dataStore = new DBApi($db);

		function readCSV($csvFile){
			$file_handle = fopen($csvFile, 'r');
			while (!feof($file_handle) ) {
				$line_of_text[] = fgetcsv($file_handle, 1024);
			}
			fclose($file_handle);
			return $line_of_text;
		}
//		[0] => Array
//	(
//		[0] => ABERDARON
//            [1] => 01/01/2015
//            [2] => 04:54
//            [3] => 3.79
//            [4] => H
//        )

		// Set path to CSV file
		$csvFile = SITEROOT.'/frontend/tide/tide_times_2014121100_2015123100.csv';
		if(file_exists($csvFile)) {
			$csv = readCSV($csvFile);

			foreach($csv as $key => $val) {
				$name = $val[0];
				$date = explode( '/', $val[1]);
				$date = $date[2].'/'.$date[1].'/'.$date[0];
				$time = $val[2];
				$height = $val[3];
				$type = $val[4];
				$result = $dataStore->checkName($name);
				$sid = $result[0]['id'];

				if($sid!=""){
					$dataStore->addTideInfo($sid, $date, $time.':00', $height, $type);
//					exit;
				}
			}
		}
    }
}