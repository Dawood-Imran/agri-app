import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Input, Button, Icon } from 'react-native-elements';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Correct import for MaterialCommunityIcons

const { width } = Dimensions.get('window'); // Get screen width

const SignUp = () => {
  const { userType } = useLocalSearchParams<{ userType: string }>();
  const router = useRouter();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [confirmPinCode, setConfirmPinCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === 'ur';

  const validateForm = () => {
    setErrorMessage(''); // Reset error message
    if (!name.trim()) {
      setErrorMessage(t('Name Required'));
      return false;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage(t('Phone Number Required'));
      return false;
    }
    if (!/^(?:\d{10}|\d{11})$/.test(phoneNumber.trim())) {
      setErrorMessage(t('Invalid Phone Number'));
      return false;
    }
    if (pinCode.length !== 4 || !/^\d+$/.test(pinCode.trim())) {
      setErrorMessage(t('Pin Code Must Be 4 Digits'));
      return false;
    }
    if (pinCode !== confirmPinCode) {
      setErrorMessage(t('Pins Must Match'));
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      alert(t('Account Created Successfully'));
      router.replace({ pathname: '/SignIn', params: { userType } });
    }
  };

  const handleBack = () => {
    router.push({ pathname: '/SignIn', params: { userType } });
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Icon name="arrow-back" type="material" color="#FFC107" size={30} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <ThemedText style={styles.titleMain}>{t('Create Account')}</ThemedText>
        <ThemedText style={styles.titleSub}>
          {t('as')} <ThemedText style={styles.userType}>{t(userType.toLowerCase())}</ThemedText>
        </ThemedText>
      </View>
      <View style={styles.form}>
        <Input
          placeholder={t('Name')}
          onChangeText={setName}
          value={name}
          leftIcon={
            <View style={styles.iconContainer}>
              <Icon name="person" type="material" color="#FFFFFF" />
              <View style={styles.separator} />
            </View>
          }
          containerStyle={styles.inputWrapper}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          placeholderTextColor="#E0E0E0"
        />
        <Input
          placeholder="3XXXXXXXXX"
          onChangeText={(text) => {
            // Only allow 10 digits and must start with 3
            if (text.length <= 10 && (!text.length || text.startsWith('3'))) {
              setPhoneNumber(text);
            }
          }}
          value={phoneNumber}
          keyboardType="phone-pad"
          leftIcon={
            <View style={[styles.iconContainer, { flexDirection: 'row', alignItems: 'center' }]}>
              <Image source={require('../assets/pakistan-flag.jpg')} style={styles.flagIcon} />
              <ThemedText style={styles.countryCode}>+92</ThemedText>
              <View style={styles.separator} />
            </View>
          }
          containerStyle={styles.inputWrapper}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          placeholderTextColor="#E0E0E0"
        />
        <Input
          placeholder={t("Enter Pin Code")}
          onChangeText={(text) => {
            if (text.length <= 4) {
              setPinCode(text);
            }
          }}
          value={pinCode}
          keyboardType="numeric"
          secureTextEntry
          maxLength={4}
          leftIcon={
            <View style={styles.iconContainer}>
              <Icon name="lock" type="material" color="#FFFFFF" />
              <View style={styles.separator} />
            </View>
          }
          containerStyle={styles.inputWrapper}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          placeholderTextColor="#E0E0E0"
        />
        <Input
          placeholder={t("Confirm Pin Code")}
          onChangeText={(text) => {
            if (text.length <= 4) {
              setConfirmPinCode(text);
            }
          }}
          value={confirmPinCode}
          keyboardType="numeric"
          secureTextEntry
          maxLength={4}
          leftIcon={
            <View style={styles.iconContainer}>
              <Icon name="lock" type="material" color="#FFFFFF" />
              <View style={styles.separator} />
            </View>
          }
          containerStyle={styles.inputWrapper}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          placeholderTextColor="#E0E0E0"
        />
        {errorMessage ? <ThemedText style={styles.errorText}>{errorMessage}</ThemedText> : null}
        <Button
          title={t('Create Account')}
          onPress={handleSignUp}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
      </View>
      <TouchableOpacity onPress={() => router.push({ pathname: '/SignIn', params: { userType } })}>
        <ThemedText style={styles.signInText}>
          {t('Already Have Account')} <ThemedText style={styles.signInHighlight}>{t('Sign In')}</ThemedText>
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
    paddingVertical: 10,
    lineHeight: 45,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 15,
    
    height: 50,
    width: '100%',
  },
  inputText: {
    color: '#FFFFFF',
    paddingLeft: 20,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
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
  signInText: {
    color: '#FFFFFF',
    marginTop: 20,
  },
  signInHighlight: {
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
    width: 24,
    height: 16,
    marginRight: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  countryCode: {
    color: '#FFFFFF',
    marginRight: 8,
    fontSize: 16,
  },
  separator: {
    height: 20,
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 10,
  },
  inputWrapper: {
    width: '100%',
    paddingHorizontal: 0,
  },
});

export default SignUp;
