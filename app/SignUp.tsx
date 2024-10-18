import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Input, Button, Icon } from 'react-native-elements';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const { userType } = useLocalSearchParams<{ userType: string }>();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === 'ur';

  const handleSignUp = () => {
    // Here you would typically handle user registration
    // For now, we'll just show an alert and navigate to the SignIn screen
    alert('Account created successfully. You can now sign in.');
    router.replace({ pathname: '/SignIn', params: { userType } });
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
        <ThemedText style={styles.titleMain}>{t('createAccount')}</ThemedText>
        <ThemedText style={styles.titleSub}>
          {t('as')} <ThemedText style={styles.userType}>{t(userType.toLowerCase())}</ThemedText>
        </ThemedText>
      </View>
      <View style={styles.form}>
        <Input
          placeholder={t('name')}
          onChangeText={setName}
          value={name}
          leftIcon={isRTL ? null : <Icon name="person" type="material" color="#FFFFFF" />}
          rightIcon={isRTL ? <Icon name="person" type="material" color="#FFFFFF" /> : null}
          inputContainerStyle={styles.inputContainer}
          inputStyle={[styles.inputText, isRTL && styles.rtlText]}
          placeholderTextColor="#E0E0E0"
        />
        <Input
          placeholder={t('email')}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={isRTL ? null : <Icon name="email" type="material" color="#FFFFFF" />}
          rightIcon={isRTL ? <Icon name="email" type="material" color="#FFFFFF" /> : null}
          inputContainerStyle={styles.inputContainer}
          inputStyle={[styles.inputText, isRTL && styles.rtlText]}
          placeholderTextColor="#E0E0E0"
        />
        <Input
          placeholder={t('password')}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          leftIcon={isRTL ? null : <Icon name="lock" type="material" color="#FFFFFF" />}
          rightIcon={isRTL ? <Icon name="lock" type="material" color="#FFFFFF" /> : null}
          inputContainerStyle={styles.inputContainer}
          inputStyle={[styles.inputText, isRTL && styles.rtlText]}
          placeholderTextColor="#E0E0E0"
        />
        <Input
          placeholder={t('confirmPassword')}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
          leftIcon={isRTL ? null : <Icon name="lock" type="material" color="#FFFFFF" />}
          rightIcon={isRTL ? <Icon name="lock" type="material" color="#FFFFFF" /> : null}
          inputContainerStyle={styles.inputContainer}
          inputStyle={[styles.inputText, isRTL && styles.rtlText]}
          placeholderTextColor="#E0E0E0"
        />
        <Button
          title={t('createAccount')}
          onPress={handleSignUp}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
      </View>
      <TouchableOpacity onPress={() => router.push({ pathname: '/SignIn', params: { userType } })}>
        <ThemedText style={styles.signInText}>
          {t('alreadyHaveAccount')} <ThemedText style={styles.signInHighlight}>{t('signIn')}</ThemedText>
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
    paddingTop: 30, // Increased padding to avoid text cutting
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
    borderBottomWidth: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  inputText: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#FFC107',
    paddingVertical: 15,
    borderRadius: 25,
    // Removed shadow properties
  },
  buttonTitle: {
    color: '#1B5E20',
    fontWeight: 'bold',
    fontSize: 20,
  },
  signInText: {
    color: '#FFFFFF',
    marginTop: 20, // Add margin for spacing
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
  rtlText: {
    textAlign: 'right',
  },
});

export default SignUp;
