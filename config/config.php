<pre><?php

// config file

print_r(get_loaded_extensions());
phpinfo();
exit;

define('DATABASE_HOST', 'localhost');
define('DATABASE_NAME', 'hutber');
define('DATABASE_USR', 'jamiehutber');
define('DATABASE_PWD', 'jadwiga852');

define('ADMIN_USER', 'hutber');
define('ADMIN_PWD', 'jadwiga963');
if (isset($_SERVER['HTTP_HOST'])) {
    if ($_SERVER['HTTP_HOST'] == 'hutber.local') {
        define('ENVIRONMENT', 'dev');
        define('CDN', 'hutber.local');
        define('HTTP', 'http://hutber.local');
    } else if ($_SERVER['HTTP_HOST'] == '192.168.0.2') {
            define('ENVIRONMENT', 'dev');
            define('CDN', '192.168.0.2');
            define('HTTP', 'http://192.168.0.2');
        } else {
        define('ENVIRONMENT', 'live');
        define('CDN', 'www.hutber.com');
        define('HTTP', 'http://www.hutber.com');
        define('HTTPS', 'https://hutber.com');
    }
}

define('PAGE_TITLE', 'Jamie Hutber');
