import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image,Button,TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { dataForLikes } from '../api/callingExposedApis';
import ItemCardContainer from "../components/ItemCardContainer";
import ItineraryContainer from "../components/ItineraryContainer";
import { Avatar } from "../assets";


const WishListScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [showElement, setShowElement] = useState(true);

  const toggleElement = () => {
    setShowElement(!showElement);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [mainData, setMainData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dataForLikes();
        setMainData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView className = "bg-white ">
<View className = "flex-row items-center justify-between px-8  shadow-2xl">
                <View>
                    {/* <Text className = "text-[36px] text-[#0B646B] font-bold">
                    Your
                    </Text> */}

                    <Text className = "text-[#527283] text-[36px] font-bold">
                    Itinerary
                    </Text>
                </View>

                <View className = "w-12 h-12 bg-red-400 rounded-md items-center justify-center shadow-lg">
                    <Image source={Avatar} className = " w-full h-full rounded-md object-cover"/>
                </View>
            </View>

      <ScrollView>
        <View className = " items-center">
          {isLoading ? (
            <Text>Loading...</Text>
          ) : mainData.length > 0 ? (
            mainData.map((item, i) => {
              const restaurantData = JSON.parse(item.data[0]).param;
              return (
                <React.Fragment key={i}>
              <View className="px-10 mt-8 flex-coloumn items-center flex-wrap justify-evenly shadow-md">
                <ItineraryContainer
                  key={i}
                  imageSrc={restaurantData?.photo?.images?.medium?.url || "https://cdn.pixabay.com/photo/2017/06/21/09/19/spoon-2426623_1280.jpg"}
                  title={restaurantData?.name}
                  location={restaurantData?.location_string}
                  data={restaurantData}
                />
              {/* <Text className = "text-[#A0C4C7] text-[20px] font-bold"> {restaurantData?.name}
              </Text> */}
              <Text className = "text-[#A0C4C7] text-[15px] font-bold">{restaurantData?.location_string}
              </Text>
              </View>
              <View className = "items-center justify-between  ">
                {showElement && <View className = "bg-white items-center justify-center" >
                  <Text className = "text-[#2C7379] text-[28px] font-bold mt-2" >Recommended Place:</Text>
                  <Text className = "text-[#A0C4C7] text-[20px] font-bold p-4">As per the reviews and the to your nearest location you can checkout this place</Text>
                  {/* <ItineraryContainer   
                  key={i}
                  imageSrc={restaurantData?.photo?.images?.medium?.url || "https://cdn.pixabay.com/photo/2017/06/21/09/19/spoon-2426623_1280.jpg"}
                  title={restaurantData?.name}
                  location={restaurantData?.location_string}
                  data={restaurantData}
                  /> */}
                  <ItineraryContainer   
                  key={i}
                  imageSrc={"https://th-thumbnailer.cdn-si-edu.com/FQu6NeSiXbNCC3TvGxtLUP88GKQ=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/c2/bd/c2bd3f0b-18ed-4e1f-8cbb-0dde4ea342c1/sqj_1701_aoe_paris_01.jpg" || "https://cdn.pixabay.com/photo/2017/06/21/09/19/spoon-2426623_1280.jpg"}
                  title="La Tour d'Argent"
                  location={restaurantData?.location_string}
                  data={restaurantData}
                  />
              </View>}
                {/* <Button title={showElement ? 'Hide Element' : 'Show Element'} onPress={toggleElement} className = "font-bold" /> */}
                <TouchableOpacity onPress={toggleElement} className ="p-2 mt-2 bg-gray-100 rounded-xl">
                    <Text className = "text-[#00BCC9] text-xl font-semibold">{showElement ? 'Hide Recommendation' : 'Show Recommendation'}</Text>
                </TouchableOpacity>
                </View>
              </React.Fragment>
              );
            })
          ) : (
            <View className="w-full h-[600px]">
              <Text className="text-[40px] text-[#2C7379] w-200 font-bold item-center px-20 mt-0">Oops...!!</Text>
              <Text className="text-[30px] text-[#2C7379] w-200 font-bold px-8 mt-0">Not Found Any Place..</Text>
              <Image className="h-[400px] w-full" source={{ uri: "https://gifdb.com/images/high/naruto-funny-crying-xcgzlj0eao9ihxnt.gif" }} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WishListScreen;
