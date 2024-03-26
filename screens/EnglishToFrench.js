import { View, Text, SafeAreaView,Image } from 'react-native'
import React ,{ useEffect, useLayoutEffect, useState }from 'react'
import TranslationAPI from '../components/TranslationAPI'
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '../assets';
import LottieView from 'lottie-react-native';

const EnglishToFrench = () => {
    const navigation = useNavigation();  
    useLayoutEffect(() =>{
        navigation.setOptions({
          headerShown:false,
        })
      },[])
  return (

    <SafeAreaView>

<View className = "flex-row items-center justify-between px-8">
                <View>
                    <Text className = "text-[40px] text-[#0B646B] font-bold">
                    Translate
                    </Text>

                    {/* <Text className = "text-[#527283] text-[36px]">
                    la France
                    </Text> */}
                </View>

                <View className = "w-12 h-12 bg-red-400 rounded-md items-center justify-center shadow-lg">
                    <Image source={Avatar} className = " w-full h-full rounded-md object-cover"/>
                </View>
            </View>
            <View className = " items-center justify-center p-4">
      <Text className = "p-2 font-semibold text-[16px]">English To French</Text>

      <TranslationAPI></TranslationAPI>
    </View>

            <View className = " h-[70%] w-full mt-5">
            <LottieView
                source={require('../assets/Animation - 1711399640912.json')}
                autoPlay
                loop
                className = "w-full h-[70%]"
              />
            </View>
        


    </SafeAreaView>
  )
}

export default EnglishToFrench