import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageSelection = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    await AsyncStorage.setItem('user-language', lng);
    router.replace('/UserSelectionScreen');
  };

  return (
    <ThemedView style={styles.container}>
      <Image 
        source={require('../assets/images/illustration-1.png')}
        style={styles.illustration}
        resizeMode="contain"
      />
      
      <View style={styles.titleContainer}>
        <ThemedText style={styles.titleEnglish}>Select Language</ThemedText>
        <ThemedText style={styles.titleUrdu}>زبان منتخب کریں</ThemedText>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeLanguage('en')}
        >
          <ThemedText style={styles.buttonTextEnglish}>English</ThemedText>
          
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeLanguage('ur')}
        >
          
          <ThemedText style={styles.buttonTextUrdu}>اردو</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#61B15A',
  },
  illustration: {
    width: '80%',
    height: 200,
    marginBottom: 30,
    
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
    height: 100,
  },
  titleEnglish: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    marginTop: 10,
    lineHeight: 30,

  },
  titleUrdu: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: 10,
    lineHeight: 40,
  },
  buttonContainer: {
    width: '80%',
    maxWidth: 300,
  },
  button: {
    backgroundColor: '#FFC107',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonTextEnglish: {
    color: '#1B5E20',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonTextUrdu: {
    color: '#1B5E20',
    fontSize: 20,
    marginBottom: 4,
    fontWeight: 'bold',
    textAlign: 'right',
    writingDirection: 'rtl',
    
  },
});

export default LanguageSelection;
