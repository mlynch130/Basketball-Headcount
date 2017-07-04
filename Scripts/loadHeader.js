//Loads a header to a <div> element with an ID of "header"

//File names
var masterCss="StyleSheets/master.css";
var headerFile ="header.html";

//Add the stylesheet
var headerStyle = document.createElement("link");
headerStyle.setAttribute("rel", "stylesheet");
headerStyle.setAttribute("type", "text/css");
headerStyle.setAttribute("href", masterCss);
document.getElementsByTagName("head")[0].appendChild(headerStyle);

//Populate the header div with the header.html contents
function readTextFile(file)
{
	var fileText;
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function() 
	{
		if (rawFile.readyState == 4)
		{
			if (rawFile.status == 200 || rawFile.status === 0)
			{
				fileText = rawFile.responseText;
			}
		}
	};
	rawFile.send(null);
	return(fileText);
}
var el = document.getElementById("header");
el.innerHTML = readTextFile(headerFile);



