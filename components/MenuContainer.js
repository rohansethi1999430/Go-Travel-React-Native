import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const MenuContainer = ({title,imageSrc, type,setType}) => {
    const handelPress = () => {
        setType(title.toLowerCase())
    }
  return (
    <TouchableOpacity className = "items-center justify-center space-y-2" onPress={handelPress}>
        <View className = {`w-24 h-24 shadow-sm  p-2 rounded-md  items-center justify-center ${type === title.toLowerCase() ? "bg-gray-200":"" }`} > 
            <Image
            source={imageSrc} className = "w-full h-full object-contain"
            />
        </View>
      <Text className = "text-[#00BCC9] text-xl font-semibold">
        
        {title}
      
      </Text>
    </TouchableOpacity>
  )
}

export default MenuContainer