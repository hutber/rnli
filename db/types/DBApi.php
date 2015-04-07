<?php

include_once SITEROOT.'/db/data.php';

class DBApi extends Data {

    function removeSites(){
        //Truncate the DB first
        $this->db->query('TRUNCATE TABLE `sites`;');
    }

    function insertSites($id, $elevation, $latitude, $longitude, $name, $region, $unitaryAuthArea)
    {
        //Now add data
        $sql = sprintf(
            "INSERT INTO 'rnli'.'sites' (
                  'id',
                  'elevation',
                  'latitude',
                  'longitude',
                  'name',
                  'region',
                  'unitaryAuthArea'
              ) VALUES (
                  %d,
                  %d,
                  '%s',
                  '%s',
                  '%s',
                  '%s',
                  '%s'
              );",
            $id,
            $elevation,
            $latitude,
            $longitude,
            $this->db->escape($name),
            $this->db->escape($region),
            $this->db->escape($unitaryAuthArea)
        );
        return $this->db->query($sql);
    }

    function getArea($lat, $long)
    {
        //Now add data
        $sql = sprintf(
            "SELECT name, id, latitude, longitude, SQRT(
            POW(69.1 * (latitude - %s), 2) +
            POW(69.1 * (%s - longitude) * COS(latitude / 57.3), 2)) AS distance
            FROM sites HAVING distance < 25 ORDER BY distance LIMIT 5;",
            $lat,
            $long
        );
        return $this->db->get($sql);
    }

    function addGPS($accuracy, $altitude, $altitudeAccuracy, $heading, $latitude, $longitude, $speed)
    {
        //Now add data
        $sql = sprintf(
            "INSERT INTO  'rnli'.'gps' (
                    'accuracy' ,
                    'altitude' ,
                    'altitudeAccuracy' ,
                    'heading' ,
                    'latitude' ,
                    'longitude' ,
                    'speed'
                )
                VALUES (
                    '%s' ,
                    '%s' ,
                    '%s' ,
                    '%s' ,
                    '%s' ,
                    '%s' ,
                    '%s'
                );",
            $accuracy, $altitude, $altitudeAccuracy, $heading, $latitude, $longitude, $speed
        );
        $this->db->query($sql);
    }
}
