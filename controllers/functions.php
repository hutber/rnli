<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Hutber
 * Date: 06/04/13
 * Time: 19:06
 * To change this template use File | Settings | File Templates.
 */

/**
 * Output a string in a safe way
 */
function o($str, $field = NULL) {
    if (isset($str)) {
        if (is_array($str) && isset($str[$field])) {
            echo htmlspecialchars($str[$field]);
        } elseif (is_object($str) && isset($str->$field)) {
            echo htmlspecialchars($str->$field);
        } elseif (is_string($str)) {
			echo htmlspecialchars($str);
        }
    } else {
        echo htmlspecialchars($field);
    }
}

/*output everything in array*/
function c($var) {
    echo '<pre style="color: black;">';
    print_r($var);
    echo '</pre>';
}

/*output everything in array*/
function r($var) {
    echo '<pre style="color: black;">';
    var_dump($var);
    echo '</pre>';
}
