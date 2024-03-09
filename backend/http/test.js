var http = require('http');
var params = require('../JSONParser/parse.js');
const du = require('../db/dbutilities2.js');
const initializeApp = require('firebase/app');
const { set, get, ref, getDatabase, remove } = require('firebase/database');


async function getUserPassword(res, username, dbu) {
	const pass = await dbu.getUserPassword(username);
	console.log(pass);
	res.write(""+pass);
	res.end();
}


//create a server object:
http.createServer(async function (req, res) {
	const dbu = new du();
	var ress = params.params(req);
	const mode = ress.mode;

	////
	//
	//USERS 
	//	username
	//	password
	//	email
	//	privelege
	//
	//ROUTES 
	//	routeId
	//	route
	//	emtype
	//

	// GET http://localhost:8080/?mode=getRoute&routeId=1231
	console.log(mode);
	if(mode.localeCompare("getPassword") == 0) {
		getUserPassword(res, ress.username, dbu);
	}
	//const pass = await dbu.getUserPassword(ress.username);
	else {
		res.write(" "); //write a response to the client
  	res.end(); //end the response
	}
}).listen(8080); //the server object listens on port 8080
