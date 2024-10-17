import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';

const UserSelectionScreen = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;
  const textSlideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(textFadeAnim, {
        toValue: 1,
        duration: 1000,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(textSlideAnim, {
        toValue: 0,
        duration: 800,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleUserSelection = (userType: 'Farmer' | 'Expert' | 'Buyer') => {
    router.push({ pathname: '/SignIn', params: { userType } });
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.Image 
        source={require('../assets/Logo maker project (3)_processed.png')} 
        style={[
          styles.logo, 
          { 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      />
      <Animated.View style={{
        opacity: textFadeAnim,
        transform: [{ translateY: textSlideAnim }]
      }}>
        <ThemedText style={styles.welcomeText}>WELCOME</ThemedText>
        <ThemedText style={styles.questionText}>AND YOU ARE?</ThemedText>
      </Animated.View>
      <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: slideAnim }] }]}>
        {[
          { type: 'Farmer', icon: require('../assets/images/farmer.png') },
          { type: 'Expert', icon: require('../assets/images/badge.png') },
          { type: 'Buyer', icon: require('../assets/images/investor.png') },
        ].map((user) => (
          <TouchableOpacity
            key={user.type}
            style={styles.button}
            onPress={() => handleUserSelection(user.type as 'Farmer' | 'Expert' | 'Buyer')}
          >
            <Image source={user.icon} style={styles.icon} />
            <ThemedText style={styles.buttonText}>{user.type.toUpperCase()}</ThemedText>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#61B15A',
    padding: 20,
  },
  logo: {
    width: 400,
    height: 400,
    marginBottom: 10,
  },
  welcomeText: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    paddingTop: 5,
    lineHeight: 30,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 30,
    color: '#FFEB3B',
    marginTop: 10,
    marginBottom: 30,
    lineHeight: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  button: {
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default UserSelectionScreen;
