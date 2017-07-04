<?php
//$string=getdate();
//echo $string[0];

$link = mysql_connect('localhost', 'webBasketball');
if (!$link) {
    die('Not connected : ' . mysql_error());
}

$db_selected = mysql_select_db('basketball', $link);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
}

$result = mysql_query("SELECT * FROM `players` WHERE `id`=3");
if (!$result) {
    $message  = 'Invalid query: ' . mysql_error() . "\n";
    $message .= 'Whole query: ' . $query;
    die($message);
}

$row = mysql_fetch_assoc($result);
echo $row['name'];
    
?>
