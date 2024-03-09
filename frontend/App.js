import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // Importă MapView și Marker din react-native-maps
import axios from 'axios';

const App = () => {
    const [routeData, setRouteData] = useState(null);

    const fetchRoute = async () => {
        try {
            const response = await axios.get('http://localhost:3000/get-route');

            setRouteData(response.data);
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    // Coordonatele pentru centrul hărții (poți ajusta aceste valori în funcție de necesități)
                    latitude: 45.75,
                    longitude: 21.25,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* Parcurge lista de coordonate și adaugă un marker pentru fiecare */}
                {routeData && routeData.map((coordinate, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: coordinate[0],
                            longitude: coordinate[1],
                        }}
                        title={`Marker ${index + 1}`}
                    />
                ))}
            </MapView>
            <View style={{ position: 'absolute', top: 20, left: 20 }}>
                <Text>Test Backend</Text>
                <Button title="Get Route" onPress={fetchRoute} />
            </View>
        </View>
    );
};

export default App;
