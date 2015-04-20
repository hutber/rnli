 <?php

class uploadProfileImage extends Controller {
    function post()
    {
		if ($_REQUEST['image']) {

            // convert the image data from base64
            $imgData = base64_decode($_REQUEST['image']);

            // set the image paths
            $file = '/var/www/rnli.hutber.com/uploads/profile/'.$_POST['uid'].'.jpg';

            // delete the image if it already exists
            if (file_exists($file)) { unlink($file); }

            // write the imgData to the file
            $fp = fopen($file, 'w');
            fwrite($fp, $imgData);
            fclose($fp);
		}
    }
}