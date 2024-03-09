import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Test Backend</Text>
            <Button title="Get Route" onPress={fetchRoute} />
            {routeData && (
                <View style={{ marginTop: 20 }}>
                    <Text>Route Data:</Text>
                    <Text>{JSON.stringify(routeData, null, 2)}</Text>
                </View>
            )}
        </View>
    );
};

export default App;
