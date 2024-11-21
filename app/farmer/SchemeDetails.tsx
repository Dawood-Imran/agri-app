import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Card, Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import schemes from '../../assets/scraped_data.json';

const SchemeDetails = () => {
  const { schemeIndex } = useLocalSearchParams<{ schemeIndex: string }>();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const scheme = schemes[Number(schemeIndex)];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon 
          name="arrow-back" 
          type="material" 
          color="#FFC107" 
          size={30} 
          onPress={() => navigation.goBack()} 
          containerStyle={{ marginLeft: 10 }}
        />
      ),
      headerTitle: t('schemeDetails'),
      headerStyle: {
        backgroundColor: '#61B15A',
      },
      headerTitleStyle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerTintColor: '#FFFFFF',
    });
  }, [navigation, t]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card containerStyle={styles.card}>
          <ThemedText style={styles.schemeTitle}>
            {scheme.Title}
          </ThemedText>
          
          {scheme.Description && (
            <ThemedText style={styles.description}>
              {scheme.Description}
            </ThemedText>
          )}
          
          <ThemedText style={styles.termsTitle}>
            {'شرائط و ضوابط'}
          </ThemedText>
          
          <ThemedText style={styles.termsDescription}>
            {'درج ذیل شرائط و ضوابط کو غور سے پڑھیں۔ یہ اسکیم کے لیے اہم معلومات فراہم کرتی ہیں۔'}
          </ThemedText>

          {scheme.TableData && scheme.TableData.length > 0 && (
            <View style={styles.tableContainer}>
              {scheme.TableData.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <ThemedText style={styles.conditionText}>
                    {item.Condition}
                  </ThemedText>
                  <ThemedText style={styles.descriptionText}>
                    {item.Description}
                  </ThemedText>
                </View>
              ))}
            </View>
          )}
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
  scrollContent: {
    padding: 15,
    paddingTop: 15,
  },
  card: {
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  schemeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#61B15A',
    textAlign: 'right',
    lineHeight: 32,
    paddingVertical: 10,
    minHeight: 80,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    color: '#333',
    textAlign: 'right',
  },
  termsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFC107',
    textAlign: 'right',
    lineHeight: 28,
  },
  termsDescription: {
    fontSize: 14,
    marginBottom: 20,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'right',
    lineHeight: 22,
  },
  tableContainer: {
    marginTop: 10,
  },
  tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 15,
  },
  conditionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#61B15A',
    textAlign: 'right',
    lineHeight: 24,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
    textAlign: 'right',
  },
});

export default SchemeDetails; 