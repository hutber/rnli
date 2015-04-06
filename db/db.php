<?php

include_once SITEROOT.'/db/MDB2.php';

class DB {
    function __construct() {
		$this->conn=MDB2::connect(array(
			'phptype'  => 'mysql',
			'username' => DATABASE_USR,
			'password' => DATABASE_PWD,
			'hostspec' => DATABASE_HOST,
			'database' => DATABASE_NAME,
		));
		$this->conn->setFetchMode(MDB2_FETCHMODE_ASSOC);

		if (PEAR::isError($this->conn))
		{
			die($this->conn->getMessage());
		}
		$this->conn->loadModule('Extended');
    }

	function errorCheck($affected){
		if(PEAR::isError($affected))
		{
			die ($affected->getMessage().' - '.$affected->getUserinfo());
		}
	}

	function query($query) {
		$affected =& $this->conn->query($query);
		$this->errorCheck($affected);
		return $affected;
	}

	function get($query){
		$affected =& $this->conn->query($query);
		$this->errorCheck($affected);
		$res = $affected->fetchAll();
		return $res;
	}

	function getFirst($query){
		$affected =& $this->conn->query($query);
		$this->errorCheck($affected);
		$res = $affected->fetchAll();
		return $res[0];
	}

	function getRow($rs, $rowNumber = 0){
		while (($row = $rs->fetchRow())) {
			return $row[$rowNumber];
		}
	}

	function escape($string){
		return $this->conn->escape($string);
	}

	function countRows( $rs ) {
		return $rs->numRows();
	}

	function getLastID()
	{
		$query = sprintf( "SELECT LAST_INSERT_ID() AS lastid; ");
		$result = $this->getFirst($query);
		return $result['lastid'];
	}

	function getUid($uid=false) {
		if($uid==false){
			$uid = SESS;
		};

		$query = sprintf( "SELECT uid FROM users WHERE sessionCheck='%s'; ",$uid);
		$result = $this->getFirst($query);
		return $result['uid'];
	}

	function convertValue ($value){
		if(((string)(int)$value == $value)){//Check if they are a string, as if they are they will need quotes around them, otherwise they are digits
			return $value;
		}else{
			return "'". $this->conn->escape($value) ."'";
		}
	}

	/**
	 * Write an SQL Query using an array and the start, middle end of a query to allow for other variables.
	 * @param str[] tags
	 * @return bool
	 */
	function genSql($open, $middle, $close, $array, $type = 'insert'){

		$tmpArray = array(); //Create array for all details

		foreach ($array as $key => $value) {
			if($value!=="" && $value!=="-1" && $value!=="0"){ //make sure the string isn't empty
				if($type=="insert"){
					$tmpArray['rows'] .= $key.', ';//Add all rows to the string
					$tmpArray['values'] .= $this->convertValue($value).', ';
				}elseif($type=="update"){
					$tmpArray['rows'] .= '`'.$key.'` = '.$this->convertValue($value).', ';//Add all rows to the string
					$tmpArray['values'] .= $this->convertValue($value).', ';
				}
			}
		}

		//Now remove trailing comma from the strings
		$tmpArray['rows'] = substr_replace($tmpArray['rows'], "", -2);
		$tmpArray['values'] = substr_replace($tmpArray['values'], "", -2);

		//generate the sql query
		if($type=="insert"){
			$query = sprintf( "
                %s
                %s
                %s
                %s
                %s",$open, $tmpArray['rows'], $middle, $tmpArray['values'], $close);
//            if(count($tmpArray['rows'])>2)
//                return $query;
		}elseif($type=="update"){
			$query = sprintf( "
            %s
            %s
            %s
            %s",$open, $tmpArray['rows'], $middle, $close);
		}
//        echo $query;
		return $query;

	}
}
