import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-elements';

const UserSelectionScreen = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const handleUserSelection = (userType: 'Farmer' | 'Expert' | 'Buyer') => {
    router.push({ pathname: '/SignIn', params: { userType } });
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ur' : 'en');
  };

  return (
    <ThemedView style={styles.container}>
      <Button
        title={t('changeLanguage')}
        onPress={toggleLanguage}
        containerStyle={styles.languageButton}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.buttonTitleStyle}
      />
      <Image 
        source={require('../assets/Logo maker project (3)_processed.png')} 
        style={styles.logo}
      />
      <ThemedText style={styles.welcomeText}>{t('welcome')}</ThemedText>
      <ThemedText style={styles.questionText}>{t('andYouAre')}</ThemedText>
      <View style={styles.buttonContainer}>
        {[
          { type: 'farmer', icon: require('../assets/images/farmer.png') },
          { type: 'expert', icon: require('../assets/images/badge.png') },
          { type: 'buyer', icon: require('../assets/images/investor.png') },
        ].map((user) => (
          <TouchableOpacity
            key={user.type}
            style={styles.button}
            onPress={() => handleUserSelection(user.type as 'farmer' | 'expert' | 'buyer')}
          >
            <Image source={user.icon} style={styles.icon} />
            <ThemedText style={styles.buttonText}>{t(user.type)}</ThemedText>
          </TouchableOpacity>
        ))}
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
    width: '30%',
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
    textAlign: 'center',
  },
  languageButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  buttonStyle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  buttonTitleStyle: {
    color: '#FFC107',
  },
});

export default UserSelectionScreen;
