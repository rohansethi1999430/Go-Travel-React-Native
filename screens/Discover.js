import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { Attractions, Avatar, Hotels, Restaurants, NotFound,WishList} from '../assets';
import MenuContainer from '../components/MenuContainer';
import { FontAwesome } from '@expo/vector-icons';
import ItemCardContainer from '../components/ItemCardContainer';
import { getPlacesData } from '../api';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';



const Discover = () => {

 const [type, setType] = useState("Attractions")

    const navigation = useNavigation();
    const[isLoading,setIsLoading]=useState(false)
    const[mainData,setMainData]=useState([])
    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);
    const [searchType, setSearchType] = useState('activities');
  
  

    useLayoutEffect(() =>{
      navigation.setOptions({
        headerShown:false,
      })
    },[])
    useEffect(()=>{
        setIsLoading(true);
        // const bl_lat = 41.325708;
        // const bl_lng = -5.559212;
        // const tr_lat = 51.124199;
        // const tr_lng = 9.662499;
        getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then( data=>{
         setMainData(data);
         setIsLoading(false);
         setInterval(()=>{setIsLoading(false)},4000)
        })

       },[bl_lat, bl_lng, tr_lat, tr_lng, type])
 

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
                <TouchableOpacity onPress ={() => navigation.navigate("WishListScreen")} className="w-16 h-16 rounded-md item-center justify-center shadow-lg">
      {/* <Image source={WishList} className="w-full h-full rounded-md object-cover"/> */}
      

      <Animatable.View 
        animation={"pulse"}
        easing={'ease-in-out'}
        iterationCount={"infinite"}
        className = "w-20 h-20 items-center justify-center rounded-full ">
            <AntDesign name="heart" size={40} color="red" />
          {/* <Text className = "text-gray-50 text-[36px] font-semibold">
            Go
          </Text> */}
        </Animatable.View>
        

      </TouchableOpacity>

                <View className = "w-12 h-12 bg-red-400 rounded-md items-center justify-center shadow-lg">
                    <Image source={Avatar} className = " w-full h-full rounded-md object-cover"/>
                </View>
            </View>

            <View className = "flex-row items-center bg-white mx-4 rounded-2xl py-1 px-4 shadow-lg" >
            <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{fields:"geometry"}}
                placeholder='Search..'
                fetchDetails = {true}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(details?.geometry?.viewport);
                    setBl_lat(details?.geometry?.viewport?.southwest?.lat);
                    setBl_lng(details?.geometry?.viewport?.southwest?.lng);
                    setTr_lat(details?.geometry?.viewport?.northeast?.lat);
                    setTr_lng(details?.geometry?.viewport?.northeast?.lng);
                }}
                
                query={{
                    key: 'AIzaSyAWXM0FKIPjd8X5C3UozYRWtzIoB7iwVlA',
                    language: 'en',
                    types: searchType === 'places' ? ['establishment'] : ['point_of_interest'],
                    components: 'country:fr', // Restrict search to France
                  }}
                />

            </View>
            <View className="flex-row justify-center mt-4 p-2 rounded-2xl  w-full items-center">
                                <TouchableOpacity onPress={() => setSearchType('places')} className={`px-4 py-2 rounded-xl ${searchType === 'places' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                <Text className={searchType === 'places' ? 'font-bold' : ''}>Places</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSearchType('activities')} className={`px-4 py-2 rounded-xl ${searchType === 'activities' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                <Text className={searchType === 'activities' ? 'font-bold' : ''}>Activities</Text>
                                </TouchableOpacity>
                        </View>
                {/* Menu Container */}
                {isLoading ? <View className = "flex-1 items-center justify-center">
                    <ActivityIndicator size={'large'} color={"#00ff00"}  />
                    
                    </View>:

                <ScrollView>

                    <View className = "flex-row items-center justify-between px-8 mt-8">
                        <MenuContainer
                        key={"hotels"}
                        title = {"Hotels"}
                        imageSrc = {Hotels}
                        type = {type}
                        setType = {setType}
                        />

                        <MenuContainer
                        
                        key={"attractions"}
                        title = {"Attractions"}
                        imageSrc = {Attractions}
                        type = {type}
                        setType = {setType}
                        />

                        <MenuContainer
                        
                        key={"Restaurants"}
                        title = {"Restaurants"}
                        imageSrc = {Restaurants}
                        type = {type}
                        setType = {setType}
                        />
                    </View>


                    <View>
                        <View className = "flex-row items-center justify-between px-4 mt-8">
                            <Text className = "text-[#2C7379] text-[28px] font-bold">
                                Top Tips
                            </Text>

                            <TouchableOpacity className = "flex-row items-center justify-between space-x-2"
                            
                            onPress={()=>navigation.navigate("Explore")}
                            
                            >
                            <Text className = "text-[#A0C4C7] text-[20px] font-bold">
                                Explore France 
                            </Text>
                            <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7" />
                            </TouchableOpacity>

                        </View>
                        <View className = "px-3 mt-8 flex-row items-center justify-evenly flex-wrap">
                            {mainData?.length > 0 ? <>

                            {mainData?.map((data,i) =>(

                                <ItemCardContainer 
                                key={i}
                                imageSrc = {
                                    data?.photo?.images?.medium?.url ?
                                    data?.photo?.images?.medium?.url :
                                    "https://gifdb.com/images/high/naruto-funny-crying-xcgzlj0eao9ihxnt.gif"
                                }
                                title = {data?.name} 
                                location = {data?.location_string}
                                data={data}
                                />

                            ))}
                             {/* <View className="flex-row justify-center mt-4">
                                <TouchableOpacity onPress={() => setSearchType('places')} className={`px-4 py-2 rounded ${searchType === 'places' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                <Text className={searchType === 'places' ? 'font-bold' : ''}>Places</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSearchType('activities')} className={`px-4 py-2 rounded ${searchType === 'activities' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                <Text className={searchType === 'activities' ? 'font-bold' : ''}>Activities</Text>
                                </TouchableOpacity>
                            </View> */}


                            </> :<>
                            
                            <View className = " w-full h-[400px] items-center justify-center space-y-8">
                                <Image
                                source={{uri : "https://gifdb.com/images/high/naruto-funny-crying-xcgzlj0eao9ihxnt.gif"}}
                                className = " w-32 h-32 object-cover"
                                />

                                <Text className = " text-2xl text-[#428288] font-semibold">
                                    Opps...No data found
                                </Text>

                            </View>
                            </>
                            }

                            
                        </View>
                    </View>


                </ScrollView>

                            }


        </SafeAreaView>

  )
}

export default Discover