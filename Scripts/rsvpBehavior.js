var playerList = "";

$(document).ready(function () {

	populatePlayerList();

	rememberPlayer();
});

//###########
//NAME: onkeyup event for #name_id
//DESCRIPTION: called after onkeyup event
//PARAMETERS:
//-(none)
//RETURNS: (none)
//###########
document.getElementById("name_id").onkeyup = function () {
	userHasTypedName();
};


//###########
//NAME: setPlayerName
//DESCRIPTION: Sets the value of the player name input based
//             on the selected list item. This is called via the
//			   onclick event for each list item. The event gets 
//			   attached in suggestPlayerList in this script
//
//			   Also called from rememberPlayer function when checking
//			   cookies
//PARAMETERS:
//-item(I,REQ)=a string containting the player name
//RETURNS: (none)
//###########
function setPlayerName(item) {
	// change input value
	$('#name_id').val(item);
	// hide proposition list
	$('#name_list_id').hide();
}

//###########
//NAME: userHasTypedName
//DESCRIPTION: Called from onKeyUp event of name input box.
//			   Used to call into suggestPlayerList
//PARAMETERS:
//-(none)	
//RETURNS: (nothing)
//###########
function userHasTypedName() {
	var keyword = $('#name_id').val();
	var listElement = $('#name_list_id');
	suggestPlayerList(keyword, listElement);
}

//###########
//NAME: suggestPlayerList
//DESCRIPTION: Looks up available players based on user input
//PARAMETERS:
//-keyword(I,REQ)=input string to use to look up suggestions
//-listElement(IO,REQ)=suggested players will be added to this list
//RETURNS: none
//###########
function suggestPlayerList(keyword, listElement) {
	var min_length = 0; // min caracters to display the autocomplete
	
	//7/2/17 - no longer using AJAX for suggesting player names.
	//		   moved it to the client instead. Keeping the ajax code below
	//		   for reference
	/*
	if (keyword.length > min_length) {
		$.ajax({
			url: 'PHP/suggestPlayerList.php',
			type: 'POST',
			data: { keyword: keyword },
			success: function (data) {
				listElement.show();
				listElement.html(data);
			},
			error: function (obj, str, exobj) {
				listElement.show();
				listElement.html('error: ' + str + ".");
			}
		});
	} else {
		$listElement.hide();
	}
	*/
	if (keyword.length > min_length) {
		var matchingPlayers;
		matchingPlayers = $.grep(playerList, function (name, index) {
			//Convert to upper
			name = name.toUpperCase();
			keyword = keyword.toUpperCase();

			//Use RegEx to check if keyword is in playerlist
			var regex = new RegExp(keyword);
			var result = name.match(regex);

			if (result !== null) { return true; }
			else { return false; }
		});

		var len = matchingPlayers.length;
		var strHtml = "";
		if (len > 0) {
			listElement.show();
			for (i = 0; i < matchingPlayers.length; i++) {
				strHtml = strHtml + "<li onclick=\"setPlayerName('"+matchingPlayers[i]+"')\">" + matchingPlayers[i] + "</li>";
			}
			listElement.html(strHtml);
		}
		else {
			listElement.hide();
		}
	} else {
		listElement.hide();
	}

}

//###########
//NAME: (name)
//DESCRIPTION: Validates that the name input is in the database. This is
//			   called by the obsubmit attribute for the rsvp form
//PARAMETERS:
//-(none)
//RETURNS: true if the name is valid and form submission should continue
//###########
function validateFormSubmission() {
	var submitterName = $('#name_id').val();
	var result = playerList.indexOf(submitterName);
	var errDiv = $("#form_error")
	errDiv.empty();

	if (result == -1)
	{
		//player is not in the database		
		errDiv.show();
		errDiv.append("<span>Sorry - we don't have '" + submitterName + "' in the list.</span>");
		return false
	}
	else {
		//player is in the database
		errDiv.hide();		
		return true;
	}
}

//###########
//NAME: populatePlayerList
//DESCRIPTION: Calls the server to get a list of available players. Stores to JSON object
//PARAMETERS:
//-(none)
//RETURNS: (none)
//###########
function populatePlayerList() {
	$.get("PHP/getPlayerList.php", function (data, status) {
		if (status == "success") {
			playerList = JSON.parse(data);
		}
	});
}

//###########
//NAME: getCookie
//DESCRIPTION: returns
//PARAMETERS:
//-cname(I,REQ)-the name of the cookie to return
//RETURNS: the value of the request cookie
//###########
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return decodeURIComponent(c.substring(name.length, c.length)); //decode twice to properly handle spaces in name
        }
    }
    return "";
}

//###########
//NAME: rememberPlayer
//DESCRIPTION: Checks for the playerName cookie and if set
//             and if set puts the name value into the input box
//PARAMETERS:
//-(none)
//RETURNS: (nothing)
//###########	
function rememberPlayer() {
	var playerName = getCookie("playerName");
	if (playerName !== null) {
		setPlayerName(playerName);
	}
}