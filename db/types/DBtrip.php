<?php
include_once SITEROOT.'/db/data.php';
class DBtrip extends Data{

/*
==================================================
Table of Contents
==================================================
	#Notes
	#Catch
*/

//* #Location   -------------------------------------------------- */
    function insertLocation($uid,$tid,$latitude,$long,$area,$continent,$country,$pcode)
    {
        $sql = sprintf("INSERT INTO `location` (
            `uid` ,
            `tid` ,
            `latitude` ,
            `longitude`,
            `area`,
            `continent`,
            `country`,
            `pcode`
        )
        VALUES (
            '%d','%d','%s','%s','%s','%s','%s','%s'
        );",
            $uid,$tid, $latitude, $long, $this->db->escape($area), $this->db->escape($continent), $this->db->escape($country), $this->db->escape($pcode)
        );
        $this->db->query($sql);
    }

    function getLocation ($uid)
    {
        $sql = sprintf("SELECT * FROM location WHERE uid = %d;", $uid);
        return $this->db->get($sql);
    }
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
    function editNote($id,$note)
    {
        $sql = sprintf("UPDATE  `rnli`.`notes` SET  `note` =  '%s' WHERE  `notes`.`id` =%d;",
			$id,$this->db->escape($note)
        );
        $this->db->query($sql);
    }

    function getNotes ($uid)
    {
        $sql = sprintf("SELECT * FROM notes WHERE uid = %d;", $uid);
        return $this->db->get($sql);
    }

    function delNote ($id)
    {
        $sql = sprintf("DELETE FROM `rnli`.`notes` WHERE `notes`.`id` = %d;", $id);
        return $this->db->get($sql);
    }

//* #Catch   -------------------------------------------------- */
    function insertCatch($uid,$tid,$species,$lbs,$oz,$ft,$ins,$released,$image,$date)
    {
        $sql = sprintf("INSERT INTO `catch` (
            `uid` ,
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
            '%d','%d','%s','%d','%d','%d','%d','%d','%d','%d'
        );",
            $uid, $tid,$this->db->escape($species),$lbs,$oz,$ft,$ins,$released,$image,$date
        );
        $this->db->query($sql);
    }

    function getCatches ($uid)
    {
        $sql = sprintf("SELECT * FROM catch WHERE uid = %d ORDER BY ID DESC;", $uid);
        return $this->db->get($sql);
    }

//* #GPS   -------------------------------------------------- */
    function insertGPS($uid,$tid,$accuracy, $altitude, $altitudeAccuracy, $heading, $latitude, $longitude, $speed, $time)
    {
        //Now add data
        $sql = sprintf(
            "INSERT INTO  `rnli`.`gps` (
                    `uid` ,
                    `tid` ,
                    `accuracy` ,
                    `altitude` ,
                    `altitudeAccuracy` ,
                    `heading` ,
                    `latitude` ,
                    `longitude` ,
                    `speed`,
                    `recordedtime`
                )
                VALUES (
                    '%s' ,
                    '%s' ,
                    '%s' ,
                    '%s' ,
                    '%s' ,
                    '%s' ,
                    '%s' ,
                    '%s' ,
                    '%s',
                    '%s'
                );",
            $uid,$tid,$accuracy, $altitude, $altitudeAccuracy, $heading, $latitude, $longitude, $speed, $time
        );
        $this->db->query($sql);
    }
//* #Trips   -------------------------------------------------- */
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

    function getTrips ($uid)
    {
        $sql = sprintf("SELECT * FROM trip t, location l WHERE t.uid = %d and t.id = l.tid GROUP BY t.id ORDER BY t.date DESC;", $uid);
        return $this->db->get($sql);
    }

    function updateHazard ($hazard, $id)
    {
        $sql = sprintf("UPDATE  `rnli`.`trip` SET  `hazard` =  '%s' WHERE  `trip`.`id` =%d;", $hazard, $id);
        return $this->db->get($sql);
    }
    function updateRating ($rating, $id)
    {
        $sql = sprintf("UPDATE  `rnli`.`trip` SET  `rating` =%d WHERE  `trip`.`id` =%d;
", $rating, $id);
        return $this->db->get($sql);
    }
}
