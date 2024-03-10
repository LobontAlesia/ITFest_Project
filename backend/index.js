const express = require('express');
const axios = require('axios');
const polyline = require('@mapbox/polyline');
const cors = require('cors'); // Import the cors middleware
var params = require('./JSONParser/parse.js');
const du = require('./db/dbutilities2.js');

const app = express();
const port = 3000;
const dbu = new du();

// Enable CORS for all routes
app.use(cors());


app.get('/signUserUp', async(req, res) => {
	try {
		const result = params.params(req);
		const username = result.username;
		const password = result.password;
		const email = result.email;
		const privilege = result.privilege;
		dbu.writeUserData(username, password, email, privilege);
		console.log('test');
		res.json({'ignore':'ignore'});
	} catch(err) {
		console.error(err);
		res.status(500).json({err: 'Failed to sign user up'});
	}
});

app.get('/getRoutes', async (req, res) => {
	try {
		const rss = await dbu.getRoutes();
		res.json(rss.toJSON());
		console.log("done");
	} catch(err) {
		console.error(err);
		res.status(500).json({err:'Failed to fetch routes'});
	}
});

app.get('/getPassword', async (req, res) => {

    try {
				
				console.log(await dbu.getRoutes());

				const result = params.params(req);
				const pass = await dbu.getUserPassword(result.username);
				const username = result.username;
				console.log(pass);
        res.json({password:pass});
    } catch(err) {
        console.error('Error:', err.message);
        res.status(500).json({ err: 'Failed to fetch password' });
    }

});

// Define a route to handle incoming POST requests
app.get('/get-route', async (req, res) => {
    try {
        
				const result = params.params(req);
				const startLat = result.startLat;
				const startLong = result.startLong;
			  const endLat = result.endLat;
				const endLong = result.endLong;
				var curtime = new Date();
				const time = curtime.getFullYear() + "-" +
						(curtime.getMonth()+1) + "-" +
						curtime.getDate() + "T" +
						curtime.getHours() + ":" +
						curtime.getMinutes() + ":" +
						curtime.getSeconds() + "Z";
				console.log(time);
				console.log(startLat);
				
        // Define the request body and headers
        const requestBody = {
                "origin": {
                    "location": {
                        "latLng": {
                            "latitude": startLat,
                            "longitude": startLong
                        }
                    }
                },
                "destination": {
                    "location": {
                        "latLng": {
                            "latitude": endLat,
                            "longitude": endLong
                        }
                    }
                },
                "travelMode": "DRIVE",
                "departureTime": time,
                "computeAlternativeRoutes": false,
                "routeModifiers": {
                    "avoidTolls": false,
                    "avoidHighways": false,
                    "avoidFerries": false
                },
                "languageCode": "en-US",
                "units": "METRIC",
                "routingPreference" : "TRAFFIC_AWARE_OPTIMAL"
        };

        const headers = {
            'X-Goog-Api-Key': 'AIzaSyA82iExnKbRUpQxj-3bkq0uLxTD2lmRvf0',
            'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
        };

        // Make a POST request to the Google Directions API
        const response = await axios.post('https://routes.googleapis.com/directions/v2:computeRoutes', requestBody, { headers });

        // Extract the polyline from the response
        const encodedPolyline = response.data.routes[0].polyline.encodedPolyline;

        // Decode the polyline to get the coordinates
        const decodedPolyline = polyline.decode(encodedPolyline);

        // Return the decoded polyline coordinates
        res.json(decodedPolyline);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch the route' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


