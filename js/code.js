const urlBase = 'http://group26poosd.xyz/LAMPAPI';
const extension = 'php';

//const form = document.getElementById("form");
//const firstname = document.getElementById("firstname");
//const lastname = document.getElementById("lastname");
//const login = document.getElementById("login");
//const password = document.getElementById("password");

const userId = 0;
const firstName = "";
const lastName = "";


//referenced from RickL
function register()
{

		firstName = getElementById("firstNameNew").value.trim();
		lastName  = getElementById("lastNameNew").value.trim();

		let login = document.getElementById("loginNew");
		let password = document.getElementById("passwordNew");

		document.getElementById("registerItem").innerHTML="";

		let tmp  = {login: login, password: password, firstname: firstName, lastname: lastName};
		let jsonPayload = JSON.stringify(tmp);

		let url = urlBase + '/Register.'+extension;

		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		//CHECK MAY CAUSE PROBLEMS
		xhr.setRequestHeader("Content-type", "application/json"; charset=UTF-8);

		try
		{
			xhr.onreadystatechange = function()
			{
				if (this.readyState == 4 && this.status == 200)
				{
					document.getElementById("registerItem").innerHTML = "User Created";

					let jsonObject= JSON.parse( xhr.responseText);

					userId=jsonObject.id;
					saveCookie();
//check to see if that is valid
					window.location.href = "home.html"
				}
			};
			xhr.send(jsonPayload);
		} catch (err)
		{
			document.getElementById("registerItem").innerHTML= err.message;

		}

}
//referenced from RickL
function doLogin()
{

	let login = document.getElementById("login");
	let password = document.getElementById("password");

	document.getElementById("loginItem").innerHTML="";

	let tmp  = {login: login, password: password};
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/Login.'+extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	//CHECK MAY CAUSE PROBLEMS
	xhr.setRequestHeader("Content-type", "application/json"; charset=UTF-8);

	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse(xhr.responseText)
				userId = jsonObject.id;

				if(userId < 1)
				{
					document.getElementById("loginItem").innerHTML = "User or Password is incorrect"
					return;
				}

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;
				saveCookie();
//check to see if that is valid
				window.location.href = "home.html"
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
	date.setTime(date.getTime()+(minutes*60*1000))
	document.cookie = "firstName= " + firstName + ",lastName = " + lastName + ", userId = "+userId +" , expires = "+date.toGMTString();
}

/*

const button = document.getElementById("formType")
let endpoint = "";

let userId = 0;
let firstName = "";
let lastName = "";

const username= document.getElementById("login");
const password= document.getElementById("password");


function user{

	var username, password;

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";

	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;

				if( userId < 1 )
				{
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();

				window.location.href = "color.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

var publicAPI = {
        login: doLogin
    };
    return publicAPI;
}*/
