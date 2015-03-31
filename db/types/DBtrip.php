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
    function insertNote($uid,$tid,$note,$date)
    {
        $sql = sprintf("INSERT INTO `notes` (
            `uid` ,
            `tid` ,
            `note`,
            `date`
        )
        VALUES (
            '%d','%d','%s','%s'
        );",
			$uid,$tid, $this->db->escape($note), $date
        );
        $this->db->query($sql);
    }

    function getNotes ($uid)
    {
        $sql = sprintf("SELECT * FROM notes WHERE uid = %d;", $uid);
        return $this->db->get($sql);
    }

    function insertCatch($tid,$species,$lbs,$oz,$ft,$ins,$released,$image,$date)
    {
        $sql = sprintf("INSERT INTO `catch` (
            `tid` ,
            `species`,
            `lbs`,
            `oz`,
            `ft`,
            `ins`,
            `released`,
            `image`,
            `date`
        )
        VALUES (
            '%d','%s','%d','%d','%d','%d','%d','%d','%d'
        );",
            $tid,$this->db->escape($species),$lbs,$oz,$ft,$ins,$released,$image,$date
        );
        $this->db->query($sql);
    }

    function insertTrip(
                $uid,
                $name,
				$date,
				$rating,
				$hazard,
				$temperature,
				$visibility,
				$winddirection,
				$weathertype,
				$pressure,
				$pressuretendency,
				$dewpoint,
				$humidity,
				$seatemperature,
				$windspeed,
				$waveheight,
				$waveperiod
    )
    {
        $sql = sprintf("INSERT INTO `trip` (
            `uid` ,
		    `name`,
            `date`,
            `rating`,
            `hazard`,
            `temperature`,
            `visibility`,
            `winddirection`,
            `weathertype`,
            `pressure`,
            `pressuretendency`,
            `dewpoint`,
            `humidity`,
            `seatemperature`,
            `windspeed`,
            `waveheight`,
            `waveperiod`
        )
        VALUES (
            '%d','%s','%s','%d','%s','%d','%d','%s','%d','%d','%d','%d','%d','%d','%d','%d','%d'
        );",
            $uid,
            $this->db->escape($name),
            $date,
            $rating,
            $this->db->escape($hazard),
            $temperature,
            $visibility,
            $this->db->escape($winddirection),
            $weathertype,
            $pressure,
            $pressuretendency,
            $dewpoint,
            $humidity,
            $seatemperature,
            $windspeed,
            $waveheight,
            $waveperiod
        );
        $this->db->query($sql);
    }
}
