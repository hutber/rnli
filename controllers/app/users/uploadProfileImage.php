 <?php

class uploadProfileImage extends Controller {
    function post()
    {
		$uploaddir = '/var/www/uploads/';
		$uploadfile = $uploaddir . basename($_FILES['userfile']['name']);
		r($_FILES);
		if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
			echo "File is valid, and was successfully uploaded.\n";
		} else {
			echo "Upload failed";
		}

    }
}