<?php
//This script looks up all available players in the database and returns their names
//in an encoded JSON object to the client. This is called when the RSVP page first loads

$playerList = array();
$name = "";

$var="N%";
$mysqli = new mysqli('localhost', 'webBasketball', '', 'basketball');

if ($mysqli->connect_error) {
   die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

$stmt = $mysqli->prepare('SELECT `name` from `players` WHERE `status`=1 ORDER BY `name`'); 
if ($stmt) {
	$stmt->execute();
	$stmt->bind_result($name);
	while ($stmt->fetch()){
		array_push($playerList,$name);
	}
		

	$stmt->close();
}
else {
    die('SQL statement error');
}

$mysqli->close();

echo json_encode($playerList);
?>
