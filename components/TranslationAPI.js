import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Keyboard } from 'react-native';
import axios from 'axios';
import * as Speech from 'expo-speech';

const TranslationAPI = () => {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const translateText = async () => {
    try {
      const response = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        null,
        {
          params: {
            q: textToTranslate,
            target: 'fr',
            key: 'AIzaSyAWXM0FKIPjd8X5C3UozYRWtzIoB7iwVlA',
          },
        }
      );

      const translatedText = response.data.data.translations[0].translatedText;
      setTranslatedText(translatedText);
      Keyboard.dismiss();
      speakTranslatedText(translatedText);
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  const speakTranslatedText = async (text) => {
    try {
      await Speech.speak(text, { language: 'fr' });
    } catch (error) {
      console.error('Speech error:', error);
    }
  };

  return (
    <View className="w-full items-center justify-center">
      <TextInput
        placeholder="Enter text to translate"
        value={textToTranslate}
        onChangeText={setTextToTranslate}
        className="bg-white text-black rounded-2xl p-3 px-4 w-[80%]"
      />
      <TouchableOpacity className="w-full items-center justify-center" onPress={translateText}>
        <View className="bg-blue-400 rounded-xl p-3 m-3 w-[50%] items-center">
          <Text className="text-[22px] text-white">Translate</Text>
        </View>
      </TouchableOpacity>
      {translatedText ? (
        <View>
          <Text className="text-xl font-bold mt-5 text-gray-400">Translated text:</Text>
          <TextInput
            value={translatedText}
            editable={false}
            multiline={true}
            className="bg-gray-200 rounded-2xl p-5 m-3 w-80 min-h-20 text-[20px]"
          />
        </View>
      ) : null}
    </View>
  );
};

export default TranslationAPI;
