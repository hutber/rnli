<?php
require_once ('functions.php');

class Controller
{

	static $viewData = array();

	function __construct()
	{
		require_once '../class/siteLoginClass.php';
		//Set up check access
		$this->login = new siteLogin();
	}

	protected function php_function($url)
	{
		if (substr($url, 0, 1) == '/') {
			$url = SUPERBASE.$url;
		}
		$this->php_functions[] = $url;
	}

	protected function send404()
	{
		header('HTTP/1.1 404 Not Found');
		$this->view('errors/404.html');
	}

	protected function redirect($uri)
	{
		header('Location: '.$uri, TRUE, 302);
		exit;
	}

	/**
	 * Renders or returns a view using the data embedded in a view contained
	 * within a shell.
	 * @param <String> $viewname
	 * @param <Array> $data Data to embed within the view
	 * @param <String> $shell
	 * @param <Boolean> $return Return the contents of the view
	 * @return <type>
	 */
	function view($viewname = '404.html', $data = array(), $shell = 'shell.html', $return = false)
	{
		if (file_exists('../views/'.$viewname)) {
			self::$viewData = $data;
			extract($data, EXTR_SKIP);

			if ($shell) {
				if (!isset($title)) {$title = PAGE_TITLE;}
				else{$title = PAGE_TITLE.' | '.$title;}
				require_once '../views/'.$shell;
			} elseif ($return) {
				// Return contents, mainly for emails
				ob_start();
				require_once '../views/'.$viewname;
				$view_contents = ob_get_contents();
				@ob_end_clean();
				return $view_contents;
			} else {
				// Otherwise continue to output view
				require_once '../views/'.$viewname;
			}
		} else {
			throw new Exception('View "views/'.$viewname.'" not found');
		}
	}
}

//Global Settings
define("SUPERBASE",  $_SERVER['DOCUMENT_ROOT']);
define("BASE",  $_SERVER['HTTP_HOST']);
define("SESS",$_COOKIE['sessionCheck']);