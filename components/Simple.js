import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import TinderCard from 'react-tinder-card';
import LottieView from 'lottie-react-native';
import FranceFlag from '../assets/FranceFlag.json';
 
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    color: '#000',
    fontSize: 30,
    marginBottom: -100,
    fontWeight: 'bold'
  },
  cardContainer: {
    width: '90%',
    maxWidth: 260,
    height: 300,
  },
  card: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 350,
    height: 350,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    resizeMode: 'cover',
    top: 140
  },
  cardImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 20,
  },
  cardTitle: {
    position: 'absolute',
    bottom: 0,
    margin: 10,
    color: '#fff',
  },
  infoText: {
    height: 120,
    justifyContent: 'center',
    display: 'flex',
    zIndex: -100,
  },
  characterInfo: {
    margin: 5,
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    top: 210
  },
  characterName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  characterDescription: {
    fontSize: 14,
    lineHeight: 14,
  },
};
 
const db = [
  {
    name: "Alcohol consumption in public places",
    desc: "It is illegal to consume alcohol on the streets in many cities across France, especially after 4 PM. This law is more strictly enforced in tourist-heavy areas.",
    image: "https://cdn2.iconfinder.com/data/icons/prohibited-forbidden-signs/100/Prohibited-07-512.png"
  },
  {
    name: "Picnics and alcohol at landmarks:",
    desc: "Picnicking with alcohol near certain landmarks, including the Eiffel Tower, is prohibited. Authorities can fine individuals for non-compliance.",
    image: "https://createsigns.com.au/cdn/shop/products/SIGN-0011-A2.jpg?v=1602823502"},
  {
    name: "Photographing police officers and public servants",
    desc: "Under certain circumstances, it's illegal to take pictures of police officers and certain public servants in France, especially in the context of them performing their duties, aimed at protecting their privacy and safety.",
    image: "https://privacyinternational.org/sites/default/files/styles/middle_column_cropped_large_1x/public/2021-06/Photographing%20police.png?itok=ioK2ToSv"},
  {
    name: "Swimming attire regulations",
    desc: "In many public swimming pools, men are not allowed to wear loose swimming shorts and are required to wear tight-fitting swimwear due to hygiene reasons",
    image: "https://www.mypoolsigns.com/img/lg/S/proper-swimming-attire-required-to-enter-pool-rules-sign-s2-5375.png",
  },
  {
    name: "Smoking in public areas",
    desc: "France has strict laws against smoking in all enclosed public spaces, including cafes, bars, and restaurants. This extends to some outdoor public spaces such as parks and playgrounds in certain cities",
    image: "https://en.armradio.am/wp-content/uploads/2019/12/no-smoking-bar.jpg",
  },
  {
    name: "Dress codes",
    desc: "While not strictly enforced by law, there are unspoken rules about dress codes when visiting religious sites, such as covering shoulders and knees in cathedrals and churches.",
    image: "https://c8.alamy.com/comp/GB2HE5/sign-showing-the-dress-code-for-entry-into-the-blue-mosque-in-istanbul-GB2HE5.jpg",
  },
  {
    name: "Feeding pigeons",
    desc: "In some cities, feeding pigeons is illegal because it's considered harmful to both the birds and the city's cleanliness.",
    image: "https://www.thesignmaker.co.nz/wp-content/uploads/2018/03/N18_Do-not-feed-the-birds.jpg",
  },
  {
    name: "Riding scooters on sidewalks",
    desc: "Riding electric scooters on sidewalks is prohibited, and violators can be fined. The law mandates that electric scooters should be used on the road or in designated bike lanes.",
    image: "https://api.wowzer.ai/storage/v1/render/image/public/images/public/4dba1138-914e-4522-8ae2-1af853e696c8.png?height=1024&resize=contain"
  },
  {
    name: "Compulsory car equipment",
    desc: "Drivers are required to carry a reflective safety vest and a warning triangle in their vehicle at all times. This rule applies to tourists driving rental cars as well.",
    image: "https://api.wowzer.ai/storage/v1/render/image/public/images/public/9d18e06c-e7b1-47e7-85e2-42dd80a30637.png?height=1024&resize=contain",
  },
  {
    name: "Supermarket plastic bags",
    desc: "France has a ban on single-use plastic bags in supermarkets. Shoppers are encouraged to bring their own bags or purchase reusable ones.",
    image: "https://www.timeforkids.com/wp-content/uploads/2020/04/TFK_200417_032.jpg?w=1024",
  }
];
 
function Simple() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState();
  const [desc, setDesc] = useState('Swipe left or right to know more!!');
  const [title, setTitle] = useState('Laws which tourist must know');
  const [image, setImage] = useState('');
  const [allSwiped, setAllSwiped] = useState(false);
 
  useEffect(() => {
    //console.log("useEffect triggered with currentIndex:", currentIndex);
    if (currentIndex === 0) {
      setAllSwiped(true);
      setTitle('');
      setDesc('');
    } else {
      setAllSwiped(false);
    }
  }, [currentIndex]);
 
  const swiped = (direction, index) => {
    setLastDirection(direction);
    setCurrentIndex(index);
    setImage(db[index].image);
    setTitle(db[index].name);
    setDesc(db[index].desc);
   
  };
 
  const outOfFrame = (name) => {
    //console.log(name + ' left the screen!');
  };
 
  return (
    <View style={styles.container}>
      <LottieView source={FranceFlag} autoPlay loop style={{ width: '20%', height: '15%' }} />
      <Text style={styles.header}>Laws to be aware of!!</Text>
      <View style={styles.cardContainer}>
        {db.map((character, index) => (
         
          <TinderCard key={character.name} onSwipe={(dir) => swiped(dir, index)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <View style={styles.card}>
            <Image style={styles.cardImage} source={{ uri: character.image }} />
            </View>
          </TinderCard>
        ))}
      </View>
      {!allSwiped && currentIndex > 0 && (
        <View style={styles.characterInfo}>
          <Text style={styles.characterName}>{db[currentIndex - 1].name}</Text>
          <Text style={styles.characterDescription}>{db[currentIndex - 1].desc}</Text>
        </View>
      )}
      <Text style={[styles.infoText, { fontWeight: 'bold', fontSize: 10, bottom: 80 }]}>Explore confidently knowing the laws of France!</Text>
      {lastDirection ? <Text style={styles.infoText}></Text> : <Text style={styles.infoText}></Text>}
    </View>
  );
}
 
export default Simple;