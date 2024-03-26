import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

// Dummy data for the FlatList
const DATA = [
  { id: 'EnglishToFrench', title: 'Français Facile', translate: "Easy French" },
  { id: 'Learn', title: 'Apprends le français', translate: "Learn French" },
  { id: 'FrenchCuisine', title: 'Découvrez la cuisine française', translate: "Discover the French cuisine" },
  { id: 'History', title: 'Histoire de France', translate: "History of France" }
];

const FlatListWithTailwind = () => {
  const navigation = useNavigation(); // Move useNavigation hook here

  // Function to render each item in the FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToScreen(item.id)}>
      <View className="bg-gray-200 p-1 my-2 rounded-lg w-full space-y-1 px-2 mt-3">
        <Text className="text-lg text-[#428288] font-semibold mt-3">{item.title}</Text>
        <Text className="text-base text-[#428288] font-semibold">{item.translate}</Text>
      </View>
    </TouchableOpacity>
  );

  const navigateToScreen = (id) => {
    switch (id) {
      case 'EnglishToFrench':
        navigation.navigate("EnglishToFrench");
        break;
      case 'Learn':
        navigation.navigate("Learn");
        break;
      // Add cases for other IDs as needed
      default:
        // Handle the default case, maybe show an error message or do nothing
        break;
    }
  };

  return (
    <View className="bg-white h-full w-full space-y-1">
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        className="p-2"
      />
    </View>
  );
};

export default FlatListWithTailwind;
