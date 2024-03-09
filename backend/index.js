const express = require('express');
const axios = require('axios');
const polyline = require('@mapbox/polyline');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Define a route to handle incoming POST requests
app.get('/get-route', async (req, res) => {
    try {
        // Define the request body and headers
        const requestBody = {
                "origin": {
                    "location": {
                        "latLng": {
                            "latitude": 45.76185634877112,
                            "longitude": 21.241412688127195
                        }
                    }
                },
                "destination": {
                    "location": {
                        "latLng": {
                            "latitude": 45.74808722222696,
                            "longitude": 21.231583093876797
                        }
                    }
                },
                "travelMode": "DRIVE",
                "departureTime": "2024-11-15T15:01:23.045123456Z",
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

