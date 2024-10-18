import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { ThemedView } from '../../components/ThemedView';
import { useTranslation } from 'react-i18next';

const BuyCoins = () => {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>{t('buyCoins')}</Text>
      <Text style={styles.content}>{t('buyCoinsContent')}</Text>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
});

export default BuyCoins;
