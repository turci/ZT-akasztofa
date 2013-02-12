var lives = 7;

function urlencode(text)
	{
	var url = new String();	
	for(var i = 0; i < text.length; i++)
		{
		switch(text.charAt(i))
			{
			case "á":
			url += "%C3%A1";
			break;
			case "é":
			url += "%C3%A9";
			break;
			case "í":
			url += "%C3%AD";
			break;
			case "ó":
			url += "%C3%B3";
			break;
			case "ö":
			url += "%C3%B6";
			break;
			case "õ":
			case String.fromCharCode(245):
			url += "%C3%B5";
			break;
			case "ú":
			url += "%C3%BA";
			break;
			case "ü":
			url += "%C3%BC";
			break;
			case "û":
			case String.fromCharCode(251):
			url += "%C3%BB";
			break;
			case " ":
			url += "%20";
			break;
			default:
			url += text.charAt(i);
			}
		}
	return(url);
	}

function getURL(withConnector)
	{
	var parts = document.URL.split("?");
	var url = parts[0];
	if(parts.length > 1)
		{
		parts.shift();
		var query = parts.join("?");
		parts = query.split("&");
		var connector = "?";
		for(var i = 0; i < parts.length; i++)
			{
			if(parts[i].substring(0, 9) != "programID" && parts[i].substring(0, 5) != "rcode" && parts[i].substring(0, 8) != "solution")
				{
				url += connector + parts[i];
				connector = "&";
				}	
			}
		if(withConnector === true)
			url += connector;
		}
	else if(withConnector === true)
		url += "?";
	return(url);
	}
	
function getConnector()
	{
	var connector = "&";
	if(getURL().indexOf("?") == -1)
		connector = "?";
	return(connector);
	}
	
function getSolution()
	{
	var soltxt = new String();
	for(var i = 0; i < solution.length; i++)
		soltxt += String.fromCharCode(solution[i]);
	return(soltxt);
	}

function checkChar(tChar, button)
	{
	if(lives == 0 || remained == 0)
		{
		if(confirm("Már véget ért a játék.\n\nJátszol még egyet?"))
			location.reload();
		}
	else
		{
		button.style.color = "#C0C0C0";
		button.disabled = true;
		
		var solved = 0;
		var tCode = tChar.charCodeAt(0);
		if(tCode == 337)
			tCode = 245;
		else if(tCode == 369)
			tCode = 251;
		for(var i = 1; i <= solution.length; i++)
			{
			if(solution[i - 1] == tCode)
				{
				var div = document.getElementById("char_" + i);
				div.innerHTML = tChar.toUpperCase();
				var place = document.getElementById("place_" + i);
				place.style.borderBottomWidth = "0px";
				solved++;
				}
			}
		if(solved == 0)
			{
			document.gallow.src = "images/step" + (7 - --lives) + "." + imgExt;
			if(lives == 0)
				{
				if(typeof(programID) == "undefined")
					{
					if(confirm("Ez sajnos nem sikerült! :(\nA megoldás '" + getSolution() + "' lett volna.\n\nJátszol még egyet?"))
						location.reload();
					}
				else
					location.href = getURL(true) + "programID=" + programID + "&rcode=" + rcode;
				}
			}
		else
			{
			remained -= solved;
			if(remained == 0)
				{
				if(typeof(programID) == "undefined")
					{
					if(confirm("Gratulálok, megfejtetted! :)\n\nJátszol még egyet?"))
						location.reload();
					}
				else
					location.href = getURL(true) + "programID=" + programID + "&rcode=" + rcode + "&solution=" + urlencode(getSolution());
				}
			}
		}
	}
	
function buttonHover(hover, button)
	{
	if(hover == true)
		button.style.color = "#FF8A00";
	else
		button.style.color = "#000000";
	}
