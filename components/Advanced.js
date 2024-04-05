import React, { useState, useMemo , useEffect} from 'react';
import { ImageBackground, Text, View, TouchableOpacity, ScrollView, Modal, TouchableHighlight } from 'react-native';
import TinderCard from 'react-tinder-card';
import historyData from '../assets/history.json';
import travel from '../assets/travel.json'
import LottieView from 'lottie-react-native';
 
 
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    color: '#000',
    fontSize: 28,
    marginBottom: 30,
    marginTop: 30
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
    height: 380,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    resizeMode: 'cover',
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
  buttons: {
    margin: 20,
    zIndex: -100,
  },
  infoText: {
    height: 120,
    justifyContent: 'center',
    display: 'flex',
    zIndex: -100,
    marginHorizontal: 20
  },
  knowMoreButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginTop: 0,
    marginBottom: 25
  },
  knowMoreText: {
    color: 'white',
    textAlign: 'center',
  },
  //more code added
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    minHeight: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
 
}
 
const Advanced = () => {
  const [allExplored, setAllExplored] = useState(false);
  const [characters, setCharacters] = useState(historyData.events);
  const [lastDirection, setLastDirection] = useState();
  const [description, setDescription] = useState('');
  const [history, setHistory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [alreadyRemoved, setAlreadyRemoved] = useState([]);
 
  const childRefs = useMemo(() => Array(historyData.events.length).fill(0).map(i => React.createRef()), [historyData.events.length]);
 
  const swiped = (direction, titleToDelete) => {
      setLastDirection(direction);
      const event = historyData.events.find(event => event.title === titleToDelete);
      if (event) {
          setTitle(event.title);
          setImage(event.image);
          setDescription(event.description);
          setHistory(event.history);
          // console.log("title:", event.title);
          // console.log("image:", event.image);
          // console.log("description:", event.description);
          // console.log("history ", event.history);
      }
      setAlreadyRemoved(prev => [...prev, titleToDelete]);
  };
 
  useEffect(() => {
      if (characters.length === alreadyRemoved.length) {
          setAllExplored(true);
      }
  }, [characters.length, alreadyRemoved.length]);
 
  const outOfFrame = (title) => {
    //console.log(title + ' left the screen!');
    updatedharacters = characters.filter(event => event.title !== title);
    setCharacters(characters);
    if (characters.length === alreadyRemoved.length) {
      setAllExplored(true);
    }
  };
 
 
  const renderAllExploredMessage = () => {
    if (allExplored) {
      return (
        <View >
           <LottieView source = {travel} autoPlay loop style={{ width: '100%', height: '200%', bottom: 250 }} />
          <Text style={{bottom: 180, marginTop: -50, fontWeight: 'bold'}}>
            Yaya!! You have checked out all hidden gems!
          </Text>
         </View>
      );
    }
    return null;
  };
 
    const navigateToKnowMore = (index) => {
      // Implement navigation logic to the "Know More" screen here
     
      setShowModal(true);
      //console.log('Navigating to "Know More" screen...');
    };
 
    const closeModal = () => {
      setShowModal(false);
    };
 
 
    const swipe = (dir) => {
      const cardsLeft = characters.filter(event => !alreadyRemoved.includes(event.title));
      if (cardsLeft.length) {
        const toBeRemoved = cardsLeft[cardsLeft.length - 1].title;
        const index = historyData.events.map(event => event.title).indexOf(toBeRemoved);
        alreadyRemoved.push(toBeRemoved);
        childRefs[index].current.swipe(dir);
      }
    };
 
    return (
      <View style={styles.container}>
   <Text style={[styles.header, { fontWeight: 'bold' }]}>France's Hidden Gems! 🇫🇷</Text>
    <View style={styles.cardContainer}>
      {characters.map((event, index) =>
        <TinderCard
          ref={childRefs[index]}
          key={event.title}
          onSwipe={(dir) => swiped(dir, event.title)}
         
          onCardLeftScreen={() => outOfFrame(event.title)}>
          <View style={styles.card}>
            <ImageBackground style={styles.cardImage} source={{uri:event.image}}>
              <Text style={styles.cardTitle}>{title}</Text>
            </ImageBackground>
          </View>
        </TinderCard>
      )}
    </View>
    {lastDirection ?
      <Text style={styles.infoText} key={lastDirection}> {renderAllExploredMessage()}</Text> : <Text style={styles.infoText}>Swipe a card to view its description!</Text>
    }
    {!allExplored && description && (
          <View style={styles.infoText}>
            <ScrollView>
              <Text style={{ textAlign: 'left', fontSize: 18, lineHeight: 20, color: '#333' }}>
                {description}
              </Text>
            </ScrollView>
          </View>
        )}
        {!allExplored && description && (
          <TouchableOpacity style={styles.knowMoreButton} onPress={navigateToKnowMore}>
          <Text style={styles.knowMoreText}>Know More</Text>
        </TouchableOpacity>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <ScrollView>
                <Text style={{ textAlign: 'left', fontSize: 18, lineHeight: 20, color: '#333' }}>
                  {history}
                </Text>
                <TouchableHighlight
                  style={styles.closeButton}
                  onPress={closeModal}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableHighlight>
                {/*console.log('Modal History:', history)*/}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
 
    );
  };
 
  export default Advanced;