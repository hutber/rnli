<?php
include_once SITEROOT.'/db/data.php';
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


    function editContacts ($name, $number, $id)
    {
        $sql = sprintf("UPDATE  `rnli`.`contacts` SET  `name` =  '%s', `number` =  '%s' WHERE  `contacts`.`id` = %d;", $name, $number, $id);
        return $this->db->get($sql);
    }

	function deleteContact($uid, $id)
	{ //Add users latest logim
		$sql = sprintf("DELETE FROM contacts WHERE id = '%s' and uid='%s';", $id, $uid);
		$this->db->query($sql);
	}
}
