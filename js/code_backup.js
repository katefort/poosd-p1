const urlBase = 'http://group26poosd.xyz/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

//referenced from RickL
function register()
{
		// Add trim later
		firstName = document.getElementById("firstNameNew").value;
		lastName  = document.getElementById("lastNameNew").value;

		let login = document.getElementById("loginNew").value;
		let password = document.getElementById("passwordNew").value;

		document.getElementById("registerItem").innerHTML="";

		let tmp  = {login: login, password: password, firstname: firstName, lastname: lastName};
		let jsonPayload = JSON.stringify(tmp);

		let url = urlBase + '/Register.'+extension;
		console.log(login);
		console.log(firstName);
		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		//CHECK MAY CAUSE PROBLEMS
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8")

		try
		{
			xhr.onreadystatechange = function()
			{
				if (this.readyState == 4 && this.status == 200)
				{
					let jsonObject= JSON.parse( xhr.responseText);
					document.getElementById("registerItem").innerHTML = "Successfully Registered Please Login";
					document.getElementById("registerItem").style.color = 'green';
					return;
//check to see if that is valid
				}
			}
			xhr.send(jsonPayload);
		} catch (err)
		{
			document.getElementById("registerItem").innerHTML= err.message;
			document.getElementById("registerItem").style.color = 'red';
		}

}
//referenced from RickL
function doLogin()
{

	let login = document.getElementById("login").value;
	let password = document.getElementById("password").value;

	document.getElementById("loginItem").innerHTML="";

	let tmp  = {login: login, password: password};
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/Login.'+extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	//CHECK MAY CAUSE PROBLEMS
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse(xhr.responseText);
				console.log(jsonObject);
				userId = jsonObject.id;

				if(userId < 1)
				{
					document.getElementById("loginItem").innerHTML = "User or Password is incorrect";
					return;
				}

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;
				saveCookie();
//check to see if that is valid
				window.location.href = "home.html";
			}
		};

		xhr.send(jsonPayload);

	} catch (err) {
		document.getElementById("loginItem").innerHTML= err.message;

	}

}

function createContact()
{
	let newContactFirst = document.getElementById("newContactFirst").value;
	let newContactLast = document.getElementById("newContactLast").value;
	let newContactPhone = document.getElementById("newContactPhone").value;
	let newContactEmail = document.getElementById("newContactEmail").value;
	document.getElementById("contactAddResult").innerHTML = "";

	console.log(userId);
	let tmp = {firstname:newContactFirst,lastname:newContactLast,phonenumber:newContactPhone,email:newContactEmail,id:userId};
	let jsonPayload = JSON.stringify( tmp );
	console.log(jsonPayload);
	let url = urlBase + '/CreateContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
}

function doUpdate()
{
	let newContactFirst = document.getElementById("newContactFirst").value;
	let newContactLast = document.getElementById("newContactLast").value;
	let newContactPhone = document.getElementById("newContactPhone").value;
	let newContactEmail = document.getElementById("newContactEmail").value;
	let oldFirstName = document.getElementById("oldFirstName").value;
	let oldLastName = document.getElementById("oldLastName").value;
	document.getElementById("contactUpdateResult").innerHTML = "";

	let tmp = {firstname:newContactFirst,lastname:newContactLast,phone:newContactPhone,email:newContactEmail,previousfirstname:oldFirstName,previouslastname:oldLastName,id:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/CreateContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactUpdateResult").innerHTML = "Contact has been updated";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactUpdateResult").innerHTML = err.message;
	}

}

function searchContacts()
{
	let srch = document.getElementById("searchbar").value;
	document.getElementById("contactSearchResult").innerHTML = "";

	let contactList = "";

	let tmp = {search:srch,id:userId};
	let jsonPayload = JSON.stringify( tmp );
	console.log(jsonPayload);

	let url = urlBase + '/Search.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactSearchResult").innerHTML = "Contacts has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );

				for( let i=0; i<jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n";
					}
				}

				document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}

function logout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function deleteContact()
{
	let deleteContactFirst = document.getElementById("deleteContactFirst").value;
	let deleteContactLast = document.getElementById("deleteContactLast").value;

	document.getElementById("contactDeleteResult").innerHTML = "";

	let tmp = {firstname:deleteContactFirst,lastname:deleteContactLast,id:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/DeleteContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactDeleteResult").innerHTML = "Contact has been deleted";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactDeleteResult").innerHTML = err.message;
	}
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++)
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}

	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		//document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function showAndHide() 
{
    var x = document.getElementById('show');
	

	if (x.style.display == 'block') 
	{
        x.style.display = 'none';
    } else {
        x.style.display = 'block';
    }

}

function andHide() 
{
    var y = document.getElementById('shows');
	

	if (y.style.display == 'block') 
	{
        y.style.display = 'none';
    } else {
        y.style.display = 'block';
    }

}

function showAnd() 
{
    var z = document.getElementById('showing');
	

	if (z.style.display == 'block') 
	{
        z.style.display = 'none';
    } else {
        z.style.display = 'block';
    }

}