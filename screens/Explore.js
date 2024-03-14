import { View, Text, SafeAreaView,Image, TouchableOpacity} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
 import  {HeroImage}  from '../assets/index';
 import * as Animatable from 'react-native-animatable';
 import { Attractions, Avatar, Hotels, Restaurants, NotFound} from '../assets';
import FlatListWithTailwind from '../components/FlatListWithTailwind';
const Explore = () => {

    const navigation = useNavigation();

useLayoutEffect(() =>{
  navigation.setOptions({
    headerShown:false,
  })
},[])

  return (
<SafeAreaView className = "bg-white flex-1 relative">
<View className = "flex-row items-center justify-between px-8">
                <View>
                    <Text className = "text-[40px] text-[#0B646B] font-bold">
                    Explorez
                    </Text>

                    <Text className = "text-[#527283] text-[36px]">
                    la France
                    </Text>
                </View>

                <View className = "w-12 h-12 bg-red-400 rounded-md items-center justify-center shadow-lg">
                    <Image source={Avatar} className = " w-full h-full rounded-md object-cover"/>
                </View>
            </View>

            <View>

                <FlatListWithTailwind></FlatListWithTailwind>

                
            </View>
</SafeAreaView>
  )
}

export default Explore