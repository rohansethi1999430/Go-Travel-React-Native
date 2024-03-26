import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { getPlacesData } from '../api';

const Discover = () => {
  const navigation = useNavigation();
  const [searchType, setSearchType] = useState('places'); // 'places' or 'activities'
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [bl_lat, setBl_lat] = useState(null);
  const [bl_lng, setBl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, searchType)
      .then((data) => {
        setMainData(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      })
      .catch((error) => {
        console.error('Error fetching places data:', error);
        setIsLoading(false);
      });
  }, [bl_lat, bl_lng, tr_lat, tr_lng, searchType]);

  return (
    <View style={{ flex: 1 }}>
      {/* Search bar */}
      <GooglePlacesAutocomplete
        placeholder="Search.."
        onPress={(data, details = null) => {
          setBl_lat(details?.geometry?.viewport?.southwest?.lat);
          setBl_lng(details?.geometry?.viewport?.southwest?.lng);
          setTr_lat(details?.geometry?.viewport?.northeast?.lat);
          setTr_lng(details?.geometry?.viewport?.northeast?.lng);
        }}
        query={{
          key: 'AIzaSyAWXM0FKIPjd8X5C3UozYRWtzIoB7iwVlA',
          language: 'en',
          types: searchType === 'places' ? ['establishment'] : ['point_of_interest'],
        }}
      />
      
      {/* Activity toggle buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <TouchableOpacity onPress={() => setSearchType('places')}>
          <Text style={{ marginHorizontal: 10, fontWeight: searchType === 'places' ? 'bold' : 'normal' }}>Places</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSearchType('activities')}>
          <Text style={{ marginHorizontal: 10, fontWeight: searchType === 'activities' ? 'bold' : 'normal' }}>Activities</Text>
        </TouchableOpacity>
      </View>

      {/* Loading indicator */}
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <ScrollView>
          {/* Display search results */}
        </ScrollView>
      )}
    </View>
  );
};

export default Discover;
