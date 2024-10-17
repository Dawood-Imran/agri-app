import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { ThemedView } from '../../components/ThemedView';

const AccountTab = () => {
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Account</Text>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  welcomeText: {
    fontSize: 24,
    color: '#333',
  },
});

export default AccountTab;
