var http = require('http');
var params = require('../JSONParser/parse.js');
const du = require('../db/dbutilities2.js');
const initializeApp = require('firebase/app');
const { set, get, ref, getDatabase, remove } = require('firebase/database');

//create a server object:
http.createServer(async function (req, res) {
	const dbu = new du();
	var ress = params.params(req);
	const pass = await dbu.getUserPassword(ress.username);
  res.write(" " + pass); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080
