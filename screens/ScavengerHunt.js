import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, Modal, Animated, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { Avatar } from '../assets';
import LottieView from 'lottie-react-native';
import { Entypo } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FontAwesome6 } from '@expo/vector-icons';
 
const ScavengerHunt = () => {
  const navigation = useNavigation();
 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
 
  
  const [timeLeft, setTimeLeft] = useState(3600);
  const [compliment, setCompliment] = useState(null);
  const compliments = [
    'Great job!',
    'You\'re doing amazing!',
    'Keep up the good work!',
    'You are a champ!',
    'You\'re on fire!',
  ];
 
  const initialClues = [
    { id: 1, description: 'Find the Eiffel Tower.', found: false, imageUri: null },
    { id: 2, description: 'Look for the red mailbox near the cafe.', found: false, imageUri: null },
    { id: 3, description: 'Search for the laptop.', found: false, imageUri: null },
    //  { id: 4, description: 'Check for human near by', found: false, imageUri: null },
  ];
  const [clues, setClues] = useState(initialClues);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) clearInterval(interval);
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get('https://francetourismbacken.netlify.app/.netlify/functions/scavengerHuntBackend/getGameData/user1');   
        if (response.data && response.data.updatedClues && response.data.updatedClues.length > 0) {
          setClues(response.data.updatedClues);
        } else {
          // Log a message for debugging purposes
          console.log('No data returned or data is not in the expected format, using default clues.');
        }
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };
  
    fetchGameData();
  }, []); // The dependency array is kept empty to run only once on component mount.
  
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    })();
  }, []);
 
  const validateClueImage = async (imageUri, clueDescription) => {
    const apiKey = 'AIzaSyA5RL6k-kZUXk6T---FG8nZ7L93hp9iWEo'; // Ensure to replace with your actual API key
    const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
 
    try {
      const base64 = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
 
      const requestBody = {
        requests: [
          {
            image: { content: base64 },
            features: [{ type: 'LABEL_DETECTION' }],
          },
        ],
      };
 
      const response = await axios.post(visionApiUrl, requestBody);
      const labels = response.data.responses[0].labelAnnotations.map((label) => label.description.toLowerCase());
 
      const isValid = labels.some((label) => clueDescription.toLowerCase().includes(label));
      return isValid;
    } catch (error) {
      console.error('Error calling the Vision API:', error);
      showAlert('Failed to analyze the image.');
      return false;
    }
  };
 
  const markAsFound = async (id) => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
 
    if (!result.cancelled) {
      const imageUri = result.assets[0].uri;
 
      if (imageUri) {
        const clueIndex = clues.findIndex((clue) => clue.id === id);
        if (clueIndex !== -1) {
          const isValid = await validateClueImage(imageUri, clues[clueIndex].description);
          if (isValid) {
            const updatedClues = clues.map((clue, index) => index === clueIndex ? { ...clue, found: true, imageUri } : clue);
            setClues(updatedClues);
            setCompliment(compliments[Math.floor(Math.random() * compliments.length)]);
            console.log(updatedClues)
            const jsonData = {updatedClues,"user":1}
            axios.post('https://francetourismbacken.netlify.app/.netlify/functions/scavengerHuntBackend/saveDataImage', jsonData)
              .then((response) => console.log(response.data))
              .catch((error) => console.error("Error saving data:", error));
            
          } else {
            showAlert('The image does not match the clue. Try again!');
          }
        } else {
          console.error('Clue with provided ID not found');
        }
      } else {
        console.error('No URI for the captured image');
      }
    }
  };
 
  const handleViewMap = () => navigation
  .navigate('MapScreen');
 
  // Custom alert to replace the native alert
  const showAlert = (message) => {
    Alert.alert("Scavenger Hunt", message);
  };
 
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
 
  return (
    <SafeAreaView style={styles.fullContainer}>
      <View className = "flex-row items-center justify-between px-8">
                <View>
                    <Text className = "text-[40px] text-[#0B646B] font-bold">
                    Scavenger
                    </Text>

                    <Text className = "text-[#527283] text-[36px]">
                    Hunt
                    </Text>
                </View>

                <View className = "w-12 h-12 bg-red-400 rounded-md items-center justify-center shadow-lg">
                    <Image source={Avatar} className = " w-full h-full rounded-md object-cover"/>
                </View>
                {/* style={styles.scoreContainer} */}

                
            </View>
<View className = "items-end flex-row justify-between">
{/* style={styles.mapButton} */}
<TouchableOpacity className = " bg-green-500 p-2 rounded-xl ml-2 flex-row" onPress={handleViewMap}>
          <Text style={styles.mapButtonText}>View Map</Text>
          {/* <Entypo name="location-pin" size={24} color="white" /> */}
          <FontAwesome6 name="location-dot" size={24} color="white" />
        </TouchableOpacity>
<View className = "  bg-blue-400 w-20 rounded-xl p-2 mr-3 ">


        <Text style={styles.scoreText}>Score: {clues.filter(clue => clue.found).length}</Text>
      </View>

</View>
<View className = " h-[20%] w-full ">
            <LottieView
                source={require('../assets/Animation - 1711490733597.json')}
                autoPlay
                loop = {false}
                className = "w-full h-[100%]"
              />
            </View>
      {/* <Text style={styles.heading}>Scavenger Hunt</Text> */}

      <ScrollView contentContainerStyle={styles.container}>
        {clues.map(clue => (
          <View key={clue.id} style={styles.clueContainer}>
            <Text style={styles.clueText}>{clue.description}</Text>
            {!clue.found ? (
              <TouchableOpacity
                style={[styles.button, styles.markAsFoundButton]}
                onPress={() => markAsFound(clue.id)}
              >
                <Text style={styles.buttonText}>Mark as Found</Text>
              </TouchableOpacity>
            ) : (
              <View style={[styles.button, styles.foundButton]}>
                <Text style={styles.buttonText}>Found</Text>
                <Ionicons name="checkmark" size={24} color="white" />
              </View>
            )}
            {clue.imageUri && <Image source={{ uri: clue.imageUri }} style={styles.image} />}
          </View>
        ))}

        {compliment && (
          <View style={styles.complimentContainer}>
            <Text style={styles.complimentText}>{compliment}</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>Time left: {formatTime(timeLeft)}</Text>
      </View>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  fullContainer: {
    marginTop: 50,
    padding: 20,
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    alignItems: 'center',
    paddingBottom: 20,
    // paddingTop: 60,
  
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34495e',
    textAlign: 'center',
    marginVertical: 20,
  },
  clueContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  clueText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  markAsFoundButton: {
    backgroundColor: '#3498db',
  },
  foundButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mapButton: {
    backgroundColor: '#9b59b6',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  scoreContainer: {
    position: 'absolute',
    top: 100,
    right: 20,
    backgroundColor: 'rgba(52, 152, 219,0.8)',
    padding: 10,
    borderRadius: 5,
  },
  scoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  complimentContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(46, 204, 113,0.8)',
    padding: 10,
    borderRadius: 5,
  },
  complimentText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  timerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  timerText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    marginTop: 10,
    width: '100%',
    height: 200,
    borderRadius: 10, // Add rounded corners to the image
  },
});
 
export default ScavengerHunt;
 