import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-elements';
import { ThemedView } from '../../components/ThemedView';
import { useTranslation } from 'react-i18next';

const YieldPrediction = () => {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <Card containerStyle={styles.card}>
          <Text style={styles.title}>{t('yieldPrediction')}</Text>
          <Text style={styles.content}>{t('yieldPredictionContent')}</Text>
        </Card>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
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

export default YieldPrediction;
