<pre><?php

// config file

print_r(get_loaded_extensions());
phpinfo();
exit;

define('DATABASE_HOST', 'localhost');
define('DATABASE_NAME', 'rnli');
define('DATABASE_USR', 'rnliheathy');
define('DATABASE_PWD', 'jamiehutber');

define('ADMIN_USER', 'a');
define('ADMIN_PWD', 'b');

if (isset($_SERVER['HTTP_HOST'])) {
    if ($_SERVER['HTTP_HOST'] == 'rnli.local') {
        define('ENVIRONMENT', 'dev');
        define('CDN', 'rnli.local');
        define('HTTP', 'http://rnli.local');
    } else if ($_SERVER['HTTP_HOST'] == '192.168.0.2') {
            define('ENVIRONMENT', 'dev');
            define('CDN', '192.168.0.2');
            define('HTTP', 'http://192.168.0.2');
        } else {
        define('ENVIRONMENT', 'live');
        define('CDN', 'rnli.hutber.com');
        define('HTTP', 'http://rnli.hutber.com');
        define('HTTPS', 'https://hutber.com');
    }
}

define('PAGE_TITLE', 'RNLI Safety App');
