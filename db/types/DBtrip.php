<?php
include_once $_SERVER['DOCUMENT_ROOT'] .'/db/data.php';
class DBtrip extends Data{

/*
==================================================
Table of Contents
==================================================
	#Notes
*/

//* #Notes   -------------------------------------------------- */
    function insertNote($uid,$note)
    {
        $sql = sprintf("INSERT INTO `notes` (
            `uid` ,
            `note`
        )
        VALUES (
            '%s','%s'
        );",
			$uid, $this->db->escape($note)
        );
        $this->db->query($sql);
    }

    function getNotes ($uid)
    {
        $sql = sprintf("SELECT * FROM notes WHERE uid = %d;", $uid);
        return $this->db->get($sql);
    }

}
