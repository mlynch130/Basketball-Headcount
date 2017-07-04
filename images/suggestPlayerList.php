<!--
I moved player name suggesting to the client, so this
script is no longer used. However, I'm saving it for reference
-->
<?php
$keyword = '%'.$_POST['keyword'].'%';
$var="N%";
$mysqli = new mysqli('localhost', 'webBasketball', '', 'basketball');

if ($mysqli->connect_error) {
   die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

$stmt = $mysqli->prepare('SELECT `name` from `players` WHERE `name` LIKE ? ORDER BY `name`'); 
if ($stmt) {
	$stmt->bind_param("s", $keyword);
	$stmt->execute();
	$stmt->bind_result($name);
	while ($stmt->fetch()){
		//echo "<li>".$name."<li />";
		echo '<li onclick="set_item(\''.str_replace("'", "\'", $name).'\')">'.$name.'</li>';
	}
		

	$stmt->close();
}
else {
	echo 'Statement failed';
}

$mysqli->close();
?>
