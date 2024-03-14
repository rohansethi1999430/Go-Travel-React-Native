import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
// import tw from 'tailwind-rn';

// Dummy data for the FlatList
const DATA = [
  { id: '1', title: 'Découvrez la culture française' },
  { id: '2', title: 'Apprends le français' },
  { id: '3', title: 'Découvrez la cuisine française' },
  { id: '4', title: 'Histoire de France' }
];

// Function to render each item in the FlatList
const renderItem = ({ item }) => (
  <View className ={"bg-gray-200 p-6 my-2 rounded-lg w-full space-y-5 px-3 mt-5" }>
    <Text className="text-2xl text-[#428288] rounded-md text-[20px] font-semibold">{item.title}</Text>
  </View>
);

const FlatListWithTailwind = () => {
  return (
    <View className={" bg-white h-full w-full space-y-2 "}>

            <Image
              source={{uri : "https://medias-prepare.paris2024.org/uploads/2020/11/20201106-JO2024-Centres-de-Pre%CC%81paration-Les-re%CC%81gions-franc%CC%A7aises-Frise-scaled.jpg?x-oss-process=image/resize,w_2560,h_1031,m_lfit/format,webp"}}
              className=" h-72 object-cover rounded-md p-2 m-1"
            />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        className={"p-4"}
      />
    </View>
  );
};

export default FlatListWithTailwind;
