import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Input, Button, Icon } from 'react-native-elements';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window'); // Get screen width

const SignIn = () => {
  const { userType } = useLocalSearchParams<{ userType: string }>();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === 'ur';

  const validateForm = () => {
    setErrorMessage(''); // Reset error message
    if (!phoneNumber.trim()) {
      setErrorMessage(t('Phone Number Required'));
      return false;
    }
    if (!/^(?:\d{10}|\d{11})$/.test(phoneNumber.trim())) {
      setErrorMessage(t('Invalid Phone Number'));
      return false;
    }
    if (pinCode.length !== 4 || !/^\d+$/.test(pinCode)) {
      setErrorMessage(t('Pin Code Must Be 4 Digits'));
      return false;
    }
    return true;
  };

  const handleSignIn = () => {
    if (validateForm()) {
      // Here you would typically handle authentication
      router.replace(`/${userType.toLowerCase()}Dashboard` as any);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Icon name="arrow-back" type="material" color="#FFC107" size={30} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <ThemedText style={styles.titleMain}>{t('Sign In')}</ThemedText>
        <ThemedText style={styles.titleSub}>
          {t('as')} <ThemedText style={styles.userType}>{t(userType.toLowerCase())}</ThemedText>
        </ThemedText>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Input
            placeholder={t("Phone Number")} // Ensure this is translated
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            keyboardType="phone-pad"
            leftIcon={
              <View style={styles.iconContainer}>
                <Image source={require('../assets/pakistan-flag.jpg')} style={styles.flagIcon} />
              </View>
            }
            inputStyle={styles.inputText}
            placeholderTextColor="#E0E0E0"
            containerStyle={styles.inputField}
            underlineColorAndroid="transparent"
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder={t("Enter Pin Code")} // Ensure this is translated
            onChangeText={setPinCode}
            value={pinCode}
            keyboardType="numeric"
            secureTextEntry
            leftIcon={
              <View style={styles.iconContainer}>
                <Icon name="lock" type="material" color="#FFFFFF" />
              </View>
            }
            inputStyle={styles.inputText}
            placeholderTextColor="#E0E0E0"
            containerStyle={styles.inputField}
            underlineColorAndroid="transparent"
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
        </View>
        {errorMessage ? <ThemedText style={styles.errorText}>{errorMessage}</ThemedText> : null}
        <Button
          title={t('Sign In')} // Ensure this is translated
          onPress={handleSignIn}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
      </View>
      <TouchableOpacity onPress={() => router.push({ pathname: '/SignUp', params: { userType } })}>
        <ThemedText style={styles.signUpText}>
          {t("Don't Have Account")} <ThemedText style={styles.signUpHighlight}>{t('Create Account')}</ThemedText>
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#61B15A',
  },
  titleContainer: {
    marginBottom: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  titleMain: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
    lineHeight: 42,
  },
  titleSub: {
    fontSize: 28,
    color: '#FFFFFF',
    marginTop: 5,
  },
  userType: {
    color: '#FFC107',
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 5,
    paddingVertical: 5,
    lineHeight: 38,
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  inputText: {
    color: '#FFFFFF',
    paddingLeft: 20, // Add padding to create space for the icon
  },
  inputField: {
    borderBottomWidth: 0, // Remove underline
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#FFC107',
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonTitle: {
    color: '#1B5E20',
    fontWeight: 'bold',
    fontSize: 20,
  },
  signUpText: {
    color: '#FFFFFF',
    marginTop: 20,
  },
  signUpHighlight: {
    color: '#FFC107',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  flagIcon: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignIn;
