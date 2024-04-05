import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { Polyline } from 'react-native-maps';

const MapScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clueLocations, setClueLocations] = useState([
    { id: 1, name: 'Eiffel Tower', latitude: 48.8584, longitude: 2.2945 },
    { id: 2, name: 'Louvre Museum', latitude: 48.8606, longitude: 2.3376 },
    { id: 3, name: 'Notre-Dame Cathedral', latitude: 48.8530, longitude: 2.3499 },
    { id: 4, name: 'Montmartre', latitude: 48.8867, longitude: 2.3431 }
  ]);
  useEffect(() => {
    getLocationAsync();
  }, []);
  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      setLoading(false);
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    } catch (error) {
      console.error('Error getting current location:', error);
    } finally {
      setLoading(false);
    }
  };
  const markAsFound = (id) => {
    const updatedClueLocations = clueLocations.map(clue => {
      if (clue.id === id) {
        return { ...clue, found: true };
      }
      return clue;
    });
    setClueLocations(updatedClueLocations);
  };
  const centerMapOnUser = () => {
    if (userLocation) {
      mapRef.current.animateToRegion({
        ...userLocation,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };
  const mapRef = React.useRef(null);
  return (
<View style={styles.container}>
      {loading ? (
<ActivityIndicator size="large" color="#0000ff" />
      ) : (
<>
<MapView
  ref={mapRef}
  style={styles.map}
  initialRegion={{
    latitude: 48.8566, // Paris latitude
    longitude: 2.3522, // Paris longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
  showsUserLocation={true}
>
  {clueLocations.map(clue => (
<Marker
      key={clue.id}
      coordinate={{ latitude: clue.latitude, longitude: clue.longitude }}
      title={clue.name}
      description={`Found: ${clue.found ? 'Yes' : 'No'}`}
      pinColor={clue.found ? 'green' : 'red'}
      onPress={() => markAsFound(clue.id)}
    />
  ))}
  {clueLocations.map(clue => (
<Polyline
      key={`line-${clue.id}`}
      coordinates={[
        { latitude: userLocation.latitude, longitude: userLocation.longitude }, // User's current location
        { latitude: clue.latitude, longitude: clue.longitude }, // Clue's location
      ]}
      strokeColor="#000" // black
      strokeWidth={3}
    />
  ))}
</MapView>
          {userLocation && (
<TouchableOpacity style={styles.locationButton} onPress={centerMapOnUser}>
<Ionicons name="locate-outline" size={30} color="black" />
</TouchableOpacity>
          )}
<Text style={styles.infoText}>
            {userLocation && `Your current location: Latitude ${userLocation.latitude.toFixed(6)}, Longitude ${userLocation.longitude.toFixed(6)}`}
</Text>
</>
      )}
</View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
});
export default MapScreen;