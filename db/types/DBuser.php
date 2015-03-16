<?php
include_once $_SERVER['DOCUMENT_ROOT'] .'/db/data.php';
class DBuser extends Data{
    /*     * *
     * General querys
     */

    function insertContact($uid,$name,$number)
    {
        $sql = sprintf("INSERT INTO `contacts` (
            `uid` ,
            `name` ,
            `number`
        )
        VALUES (
            '%s','%s', '%s'
        );",
			$uid, $this->db->escape($name), $this->db->escape($number)
        );
        $this->db->query($sql);
    }

    function getContacts ($uid)
    {
        $sql = sprintf("SELECT * FROM contacts WHERE uid = %d;", $uid);
        return $this->db->get($sql);
    }

}
