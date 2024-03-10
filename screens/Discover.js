import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '../assets';


const Discover = () => {

    const navigation = useNavigation();

    useLayoutEffect(() =>{
      navigation.setOptions({
        headerShown:false,
      })
    },[])

  return (

        <SafeAreaView className = "flex-1 bg-white relative">
            <View className = "flex-row items-center justify-between px-8">
                <View>
                    <Text className = "text-[40px] text-[#0B646B] font-bold">
                        Discover
                    </Text>

                    <Text className = "text-[#527283] text-[36px]">
                        France today
                    </Text>
                </View>

                <View className = "w-12 h-12 bg-red-400 rounded-md items-center justify-center shadow-lg">
                    <Image source={Avatar} className = " w-full h-full rounded-md object-cover"/>
                </View>
            </View>

            <View className = "flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg" >
            <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{fields:"geometry"}}
                placeholder='Search'
                fetchDetails = {true}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(details?.geometry?.viewport);
                }}
                query={{
                    key: 'AIzaSyAWXM0FKIPjd8X5C3UozYRWtzIoB7iwVlA',
                    language: 'en',
                }}
                />
            </View>

        </SafeAreaView>

  )
}

export default Discover