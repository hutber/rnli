<?php

class debug extends webController {

    function get($type)
    {
		$homepage = file_get_contents('http://debug.build.phonegap.com/target/target-script-min.js#hutber');
		header('Content-Type: application/javascript');
		echo $homepage;
    }
}