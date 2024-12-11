import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Input, Button, Icon } from 'react-native-elements';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useTranslation } from 'react-i18next';

const VerifyPin = () => {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (!pin.trim() || pin.length !== 4) {
      Alert.alert(t('error'), t('Please enter a valid PIN'));
      return;
    }
    // Here you would typically verify the PIN
    router.replace('/SignIn');
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
        <ThemedText style={styles.titleMain}>{t('Verify PIN')}</ThemedText>
        <ThemedText style={styles.titleSub}>
          {t('Enter the PIN sent to your phone')}
        </ThemedText>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Input
            placeholder={t('Enter Pin Code')}
            onChangeText={(text) => {
              if (text.length <= 4) {
                setPin(text);
              }
            }}
            value={pin}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
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
        </View>

        <Button
          title={t('Verify')}
          onPress={handleSubmit}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
      </View>
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
        fontSize: 30,
        color: '#FFC107',
        fontWeight: 'bold',
        marginBottom: 10,
        lineHeight: 42,
      },
      titleSub: {
        fontSize: 20,
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
      
      iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
      },
      
      separator: {
        height: 20,
        width: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginHorizontal: 10,
      },
});

export default VerifyPin; 