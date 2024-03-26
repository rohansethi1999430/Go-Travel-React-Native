import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

 import { SafeAreaView, Text, View } from 'react-native';
 import HomeScreen from './screens/HomeScreen'
import Discover from './screens/Discover';
import ItemScreen from './screens/ItemScreen';
import Explore from './screens/Explore';
import WishListScreen from './screens/WishListScreen';
import EnglishToFrench from './screens/EnglishToFrench';


 const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name = "Discover" component={Discover}/>
      <Stack.Screen name = "ItemScreen" component={ItemScreen}/>
      <Stack.Screen name = "Explore" component={ Explore}/>
      <Stack.Screen name = "WishListScreen" component={WishListScreen}/>
      <Stack.Screen name = "EnglishToFrench" component={EnglishToFrench}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

