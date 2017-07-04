<<<<<<< HEAD
<!--This script will contain functions for getting admin settings -->

<?php

    //###########
    //NAME: getAdminFileContents
    //DESCRIPTION: Loads the admin.json file into an array
    //PARAMETERS:
    //-(none)
    //RETURNS: an array containing the admin.json contents
    //###########
    function getAdminFileContents() {
        $fileContents = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT']."/Config/admin.json"),true);
        return $fileContents;
    }

    //###########
    //NAME: getCurrentHeadCountDate
    //DESCRIPTION: returns the date for the current headcount
    //PARAMETERS:
    //-(none)
    //RETURNS: the date in yyyy-mm-dd
    //###########
    function getCurrentHeadCountDate() {
        $fileContents = getAdminFileContents();
        return $fileContents["CurrentHeadCountDate"];
    }

=======
<!--This script will contain functions for getting admin settings -->

<?php

    //###########
    //NAME: getAdminFileContents
    //DESCRIPTION: Loads the admin.json file into an array
    //PARAMETERS:
    //-(none)
    //RETURNS: an array containing the admin.json contents
    //###########
    function getAdminFileContents() {
        $fileContents = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT']."/Config/admin.json"),true);
        return $fileContents;
    }

    //###########
    //NAME: getCurrentHeadCountDate
    //DESCRIPTION: returns the date for the current headcount
    //PARAMETERS:
    //-(none)
    //RETURNS: the date in yyyy-mm-dd
    //###########
    function getCurrentHeadCountDate() {
        $fileContents = getAdminFileContents();
        return $fileContents["CurrentHeadCountDate"];
    }

>>>>>>> basketball/master
?>