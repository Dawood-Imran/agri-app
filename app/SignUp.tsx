import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Input, Button, Icon } from 'react-native-elements';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';

const SignUp = () => {
  const { userType } = useLocalSearchParams<{ userType: string }>();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Here you would typically handle user registration
    // For now, we'll just show an alert and navigate to the SignIn screen
    alert('Account created successfully. You can now sign in.');
    router.replace({ pathname: '/SignIn', params: { userType } });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>
        Sign Up as {userType}
      </ThemedText>
      <View style={styles.form}>
        <Input
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Icon name="email" type="material" color="#FFFFFF" />}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          placeholderTextColor="#E0E0E0"
        />
        <Input
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          leftIcon={<Icon name="lock" type="material" color="#FFFFFF" />}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          placeholderTextColor="#E0E0E0"
        />
        <Input
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
          leftIcon={<Icon name="lock" type="material" color="#FFFFFF" />}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          placeholderTextColor="#E0E0E0"
        />
        <Button
          title="Sign Up"
          onPress={handleSignUp}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
      </View>
      <TouchableOpacity onPress={() => router.push({ pathname: '/SignIn', params: { userType } })}>
        <ThemedText style={styles.signInText}>Already have an account? Sign In</ThemedText>
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
  title: {
    marginBottom: 40,
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  },
  buttonTitle: {
    color: '#1B5E20',
    fontWeight: 'bold',
  },
  signInText: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
});

export default SignUp;
