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

function saveCookie()
{

	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "firstName= " + firstName + ",lastName = " + lastName + ", userId = "+userId +" , expires = "+date.toGMTString();
}

function logout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}
function SearchContacts()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
	let contactList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContacts.' + extension;
	
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
