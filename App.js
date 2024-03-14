import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

 import { SafeAreaView, Text, View } from 'react-native';
 import HomeScreen from './screens/HomeScreen'
import Discover from './screens/Discover';
import ItemScreen from './screens/ItemScreen';
import Explore from './screens/Explore';


 const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name = "Discover" component={Discover}/>
      <Stack.Screen name = "ItemScreen" component={ItemScreen}/>
      <Stack.Screen name = "Explore" component={ Explore}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

