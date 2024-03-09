const admin=require('firebase-admin');

var serviceAccount = require('../../resources/outtheway-cf253-firebase-adminsdk-jgfj6-d1af91696f.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://outtheway-cf253.firebaseio.com",
	authDomain: "outtheway-cf253.firebaseapp.com",
});


var db=admin.database();
var userRef=db.ref("users");

addUser(obj,res) {
	var oneUser=userRef.child(obj.roll);
	oneUser.update(obj,(err)=>{
		if(err){
			res.status(300).json({"msg":"Something went wrong","error":err});
		}else{
			res.status(200).json({"msg":"user created sucessfully"});
		}
	}) 
}


