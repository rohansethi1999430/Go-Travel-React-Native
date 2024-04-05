import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ClueItem = ({ clue, onFound }) => (
  <View style={styles.clueContainer}>
    <Text style={styles.clueText}>{clue.description}</Text>
    {!clue.found ? (
      <TouchableOpacity
        style={[styles.button, styles.markAsFoundButton]}
        onPress={() => onFound(clue.id)}
      >
        <Text style={styles.buttonText}>Mark as Found</Text>
      </TouchableOpacity>
    ) : (
      <View style={[styles.button, styles.foundButton]}>
        <Text style={[styles.buttonText, { marginRight: 10 }]}>Found</Text>
        <Ionicons name="checkmark" size={24} color="white" />
      </View>
    )}
    {clue.imageUri && (
      <Image source={{ uri: clue.imageUri }} style={styles.image} />
    )}
  </View>
);

const styles = StyleSheet.create({
  clueContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  clueText: {
    fontSize: 18,
    color: '#444',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  markAsFoundButton: {
    backgroundColor: '#2980b9',
  },
  foundButton: {
    backgroundColor: '#27ae60',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    marginTop: 10,
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default ClueItem;
