<?php
$playerNameErr = "";
$playerName = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $playerName = secure_input($_POST["playerName"]);

    if (playerIsLegit($playerName)) {
        echo "we're cool here";
    }
    else {
        $playerNameErr = "Sorry - your name is not in the database.";
        echo $playerNameErr;
    }
}


//###########
//NAME: secure_input
//DESCRIPTION: Prevent malicious input from form submission
//PARAMETERS:
//-data=the string received from client
//RETURNS: the string trimmed, slashes stripped, and html special chars handled
//###########
function secure_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

//###########
//NAME: playerIsLegit
//DESCRIPTION: Check if a player name is in the database
//PARAMETERS:
//-playerName = the name to check
//RETURNS: true if the player is in database, false if not
//###########
function playerIsLegit($playerName) {
    $result="";
    $return=false;
    $mysqli = new mysqli('localhost', 'webBasketball', '', 'basketball');

    if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
                . $mysqli->connect_error);
    }

    $stmt = $mysqli->prepare('SELECT `name` from `players` WHERE `name`=?'); 
    if ($stmt) {
        $stmt->bind_param("s", $playerName);
        $stmt->execute();
        $stmt->bind_result($result);
        $stmt->fetch(); 

        if (!empty($result)) {
            $return=true;
        }               

        $stmt->close();
    }
    $mysqli->close();
    return $return;
}

?>