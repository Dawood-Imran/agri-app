import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, Image, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Input, Button, Icon } from 'react-native-elements';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Correct import for MaterialCommunityIcons
import { Toast } from './components/Toast';

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
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const isRTL = i18n.language === 'ur';

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const validateForm = () => {
    setErrorMessage(''); // Reset error message
    if (!name.trim()) {
      showToast(t('Name Required'));
      return false;
    }
    if (!phoneNumber.trim()) {
      showToast(t('Phone Number Required'));
      return false;
    }
    if (!/^(?:\d{10}|\d{11})$/.test(phoneNumber.trim())) {
      showToast(t('Invalid Phone Number'));
      return false;
    }
    if (pinCode.length !== 4 || !/^\d+$/.test(pinCode.trim())) {
      showToast(t('Pin Code Must Be 4 Digits'));
      return false;
    }
    if (pinCode !== confirmPinCode) {
      showToast(t('Pins Must Match'));
      return false;
    }
    return true;
  };

  const validatePhoneNumber = (text: string) => {
    const cleanedText = text.replace(/[\s-]/g, '');
    
    if (cleanedText.length <= 10 && (!cleanedText.length || cleanedText.startsWith('3'))) {
      setPhoneNumber(cleanedText);
      setErrorMessage('');
    } else if (cleanedText.length > 10) {
      showToast(t('Phone number cannot exceed 10 digits'));
    } else if (!cleanedText.startsWith('3')) {
      showToast(t('Phone number must start with 3'));
    }
  };

  const handleSignUp = () => {
    if (validateForm()) {
      Alert.alert(
        t('Confirm'),
        t('Are you sure you want to create an account with phone number +92') + phoneNumber + '?',
        [
          {
            text: t('Cancel'),
            style: 'cancel'
          },
          {
            text: t('Yes'),
            onPress: () => {
              alert(t('Account Created Successfully'));
              router.replace({ pathname: '/SignIn', params: { userType } });
            }
          }
        ]
      );
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
        {userType && (
          <ThemedText style={styles.titleSub}>
            {t('as')} <ThemedText style={styles.userType}>
              {t(userType.toLowerCase())}
            </ThemedText>
          </ThemedText>
        )}
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
          onChangeText={validatePhoneNumber}
          value={phoneNumber}
          keyboardType="numeric"
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
          errorMessage={errorMessage}
          errorStyle={styles.errorText}
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
      <Toast 
        visible={toastVisible}
        message={toastMessage}
        type="error"
        onHide={() => setToastVisible(false)}
      />
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
    paddingVertical: 10,
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
    width: '80%',
    left: '10%',
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
