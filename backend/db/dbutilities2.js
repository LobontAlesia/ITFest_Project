// Import the functions you need from the SDKs you need

//import { initializeApp } from "firebase/app";
const fbapp = require('firebase/app');
const fbdb = require('firebase/database');
const ref = fbdb.ref;// require('firebase/database');
//const set = require('firebase/database');
const get = fbdb.get;//require('firebase/database');
//const remove = require('firebase/database');
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional


module.exports = class dbutilities {
	constructor() {
	 	this.firebaseConfig = {

  		apiKey: "AIzaSyCuTCXP1uS0qzdijLt1lkmY0C0vQqvdAoA",

  		authDomain: "outtheway-cf253.firebaseapp.com",

  		databaseURL: "https://outtheway-cf253-default-rtdb.europe-west1.firebasedatabase.app",

  		projectId: "outtheway-cf253",

  		storageBucket: "outtheway-cf253.appspot.com",

  		messagingSenderId: "614612336849",

  		appId: "1:614612336849:web:658c857ed847d55a07c5f0",

  		measurementId: "G-H2D7F5XL4M"
		};
		this.app = fbapp.initializeApp(this.firebaseConfig);
		this.db = fbdb.getDatabase(this.app);
	}

	writeUserData(username, password, email) {
  	fbdb.set(fbdb.ref(this.db, 'users/' + username), {
    	email: email,
			password: password
  	});
	}

	writeRouteData(routeId, route, emtype) {
		fbdb.set(fbdb.ref(this.db, 'routes/' + routeId), {
			route: route,
			emtype: emtype
		});
	}

	deleteUser(username) {
	 //db.getReference().child("users").child(username).removeValue(a);
		 fbdb.remove(fbdb.ref(this.db, 'users/' + username));
	}

	deleteRoute(routeId) {
		fbdb.remove(fbdb.ref(this.db, 'routes/' + routeId));
	}

  getUserSnapshot(username) {
		return get(ref(this.db, 'users/' + username));
	}

	async getUserPassword (username) {
		const snapshot = await this.getUserSnapshot(username);
		try {
			const pass = snapshot.val().password;
			return pass;
		} catch(err) {
			return {"58utu58u8u88u88dg9dujns9fsjdj9sja9j":"asdasd"};
		}
	}
	
}


//console.log(await getUserPassword("alex"));
//deleteUser("alex");
//deleteRoute("1");
//writeRouteData(2, "test", "test");
//writeUserData("alex", "test1234", "alex@gmail.com");
