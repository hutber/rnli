<?php

class DBemail extends Data{
    /*     * *
     * General querys
     */

    function insertEmail($user_id,$email,$type)
    {
        $sql = sprintf("INSERT INTO `emails_sent` (
            `uid` ,
            `date` ,
            `type` ,
            `address`
        )
        VALUES (
            '%d', NOW(), '%s', '%s'
        );",
            $user_id, $type, $this->db->escape($email)
        );
        $this->db->query($sql);
    }


}
