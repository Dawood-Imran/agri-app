import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, Image, Alert, ImageBackground , Text} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Input, Button, Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { Toast } from './components/Toast';

const { width } = Dimensions.get('window'); // Get screen width

const SignIn = () => {
  const { userType } = useLocalSearchParams<{ userType: string }>();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === 'ur';

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
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

  const handleSignIn = () => {
    if (!phoneNumber.trim() || !pinCode.trim()) {
      showToast(t('All Fields Required'));
      return;
    }

    // Here you would typically handle authentication
    if (userType) {
      switch(userType.toLowerCase()) {
        case 'farmer':
          router.replace('/farmer/dashboard');
          break;
        case 'expert':
          router.replace('/expert/dashboard');
          break;
        case 'buyer':
          router.replace('/buyer/dashboard');
          break;
        default:
          Alert.alert(t('error'), 'Invalid user type');
          router.replace('/UserSelectionScreen');
      }
    } else {
      // Handle case when userType is not available
      Alert.alert(t('error'), 'Please select user type');
      router.replace('/UserSelectionScreen');
    }
  };



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

  

  const handleBack = () => {
    router.push('/UserSelectionScreen');
  };

  const handleForgotPin = () => {
    router.push('/ForgotPin');
  };

  return (
  
    <  View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Icon name="arrow-back" type="material" color="#FFC107" size={30} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <  Text style={styles.titleMain}>{t('Sign In')}</  Text>
        {userType && (
          <  Text style={styles.titleSub}>
            {t('as')} <  Text style={styles.userType}>
              {t(userType.toLowerCase())}
            </  Text>
          </  Text>
        )}
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="3XXXXXXXXX"
            onChangeText={validatePhoneNumber}
            value={phoneNumber}
            keyboardType="numeric"
            leftIcon={
              <View style={[styles.iconContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                <Image source={require('../assets/pakistan-flag.jpg')} style={styles.flagIcon} />
                <  Text style={styles.countryCode}>+92</  Text>
                <View style={styles.separator} />
              </View>
            }
            inputStyle={styles.inputText}
            placeholderTextColor="#E0E0E0"
            containerStyle={styles.inputField}
            underlineColorAndroid="transparent"
            inputContainerStyle={{ borderBottomWidth: 0 }}
            errorMessage={errorMessage}
            errorStyle={styles.errorText}
          />
        </View>
        <View style={styles.inputContainer}>
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
            inputStyle={styles.inputText}
            placeholderTextColor="#E0E0E0"
            containerStyle={styles.inputField}
            underlineColorAndroid="transparent"
            inputContainerStyle={{ borderBottomWidth: 0 }}
          />
          <TouchableOpacity 
            onPress={handleForgotPin} 
            style={styles.forgotPinContainer}
          >
            <  Text style={styles.forgotPinText}>
              {t('Forgot PIN?')}
            </  Text>
          </TouchableOpacity>
        </View>
        <Button
          title={t('Sign In')} // Ensure this is translated
          onPress={handleSignIn}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
      </View>
      <TouchableOpacity onPress={() => router.push({ pathname: '/SignUp', params: { userType } })}>
        <  Text style={styles.signUpText}>
          {t("Don't Have Account")} <  Text style={styles.signUpHighlight}>{t('Create Account')}</  Text>
        </  Text>
      </TouchableOpacity>
      <Toast 
        visible={toastVisible}
        message={toastMessage}
        type="error"
        onHide={() => setToastVisible(false)}
      />
    </  View>
    
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
    marginTop: 20,
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
    paddingVertical: 15,
    lineHeight: 45,
    paddingHorizontal: 15,
    textAlign: 'center',
    minWidth: 150,
    borderRadius: 10,
    
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 15,
    width: '100%',
  },
  inputText: {
    color: '#FFFFFF',
    paddingLeft: 20,
    fontSize: 16,
  },
  inputField: {
    borderBottomWidth: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
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
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'left',
    marginLeft: 15,
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
  forgotPinContainer: {
    alignItems: 'flex-end',
    paddingRight: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  forgotPinText: {
    color: '#FFC107',
    fontSize: 14,
    textDecorationLine: 'underline',
    textDecorationColor: '#FFC107',
  },
});

export default SignIn;
