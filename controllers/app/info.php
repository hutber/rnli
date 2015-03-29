<?php

class info extends Controller {

	function get($type, $data=array()) {
		phpinfo();
    }
}


//if($tmpName!=$uname){
//	$tmpName = $uname;
//}else {
//	echo '<b>'.$key.':</b> '.$uname.'<br>';
//}