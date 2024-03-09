// Import the functions you need from the SDKs you need

//import { initializeApp } from "firebase/app";
const initializeApp = require('firebase/app');
const getDatabase = require('firebase/app');
const ref = require('firebase/app');
const set = require('firebase/app');
const get = require('firebase/app');
const remove = require('firebase/app');
//import { getDatabase, ref, set, get, remove } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCuTCXP1uS0qzdijLt1lkmY0C0vQqvdAoA",

  authDomain: "outtheway-cf253.firebaseapp.com",

  databaseURL: "https://outtheway-cf253-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "outtheway-cf253",

  storageBucket: "outtheway-cf253.appspot.com",

  messagingSenderId: "614612336849",

  appId: "1:614612336849:web:658c857ed847d55a07c5f0",

  measurementId: "G-H2D7F5XL4M"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


function writeUserData(username, password, email) {
  set(ref(db, 'users/' + username), {
    email: email,
		password: password
  });
}

function writeRouteData(routeId, route, emtype) {
	set(ref(db, 'routes/' + routeId), {
		route: route,
		emtype: emtype
	});
}

function deleteUser(username) {
	 //db.getReference().child("users").child(username).removeValue(a);
	 remove(ref(db, 'users/' + username));
}

function deleteRoute(routeId) {
	remove(ref(db, 'routes/' + routeId));
}

function getUserSnapshot(username) {
	return get(ref(db, 'users/' + username));
}

async function getUserPassword(username) {
	const query = await getUserSnapshot(username);
	return query.val().password;
}
//console.log(await getUserPassword("alex"));
//deleteUser("alex");
//deleteRoute("1");
//writeRouteData(2, "test", "test");
//writeUserData("alex", "test1234", "alex@gmail.com");

module.exports = {  

	getUserPassword

};

