<?php

// Front controller
// set default timezone
date_default_timezone_set('UTC');

// config
require_once '/config/config.php';

// deconstruct request
$url = substr($_GET['url'], 1);

$method = strtolower($_SERVER['REQUEST_METHOD']);

$format = 'html'; // default output format
//
// strip of extension
$pos = strrpos($url, '.');
$parts = explode("/", $url);

#echo '<pre>'; print_r($parts); echo '</pre><br>';

//reset the url so we can work with it to get the current controller.
$url = '';

//loop through all parts of the url and assign correct parts to $url with no limit
foreach ($parts as $key => $value) {
    if ($value != '') {
        $url .= '/' . $value;
        $depth = true;
    }
}

//if there is only one result we must be at the home of a folder so add home.php as the base url
//By default this means that home.php is the base file for all folders
if(count($parts)==1){
        $url .= '/home';
}

// load controller
require_once '/controllers/controller.php';
$controllerFilename = '/controllers' . $url . '.php';
#echo $controllerFilename;
if (file_exists($controllerFilename)) {

	$url = preg_split('[/]', $url);
    $controllerName = end($url);

    require_once $controllerFilename;
    $controller = new $controllerName();

    // call controller
    if (method_exists($controller, $method)) {
//		echo 'true';
        $controller->$method($format);
    } else { // method doesn't exist, 405
//		echo 'false';
        $controller = new Controller();
        header('HTTP/1.1 405 Method Not Allowed');
        $controller->view('errors/405.html');
    }
} else { // not found, 404
    $controller = new Controller();
    header('HTTP/1.1 404 Not Found');
    $controller->view('errors/404.html');
}

