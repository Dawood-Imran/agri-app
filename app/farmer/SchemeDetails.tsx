import React from 'react';
import { StyleSheet, ScrollView, View, Dimensions, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Card, Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { useSchemes } from '../hooks/useSchemes';

const tractorImage = require('../../assets/images/farmer-icons/tractor_scheme-1.jpg');

const { width } = Dimensions.get('window');

const SchemeDetails = () => {
  const { schemeId } = useLocalSearchParams<{ schemeId: string }>();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const { schemes, loading, error } = useSchemes();
  
  const scheme = schemes.find(s => s.id === schemeId);

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

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#61B15A" />
      </ThemedView>
    );
  }

  if (error || !scheme) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>
          {error || 'Scheme not found'}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {scheme.Title === "ٹرکٹر اسکیم" && (
          <Card containerStyle={styles.imageCard}>
            <Image source={tractorImage} style={styles.cardImage} />
          </Card>
        )}

        <ThemedText style={styles.schemeTitle}>
          {scheme.Title}
        </ThemedText>
        <ThemedText style={styles.bodyText}>
          {scheme.Description}
        </ThemedText>

        <Card containerStyle={styles.conditionCard}>
          <Card.Title>
            <ThemedText style={styles.conditionTitle}>شرائط و ضوابط</ThemedText>
          </Card.Title>
          <Card.Divider />
          <View>
            {scheme.TableData && scheme.TableData.length > 0 && scheme.TableData.map((item, index) => (
              <View key={index} style={styles.conditionItem}>
                <View style={styles.conditionTextContainer}>
                  <ThemedText style={styles.conditionText}>{item.Condition}</ThemedText>
                  <ThemedText style={styles.conditionDescription}>{item.Description}</ThemedText>
                </View>
              </View>
            ))}
          </View>
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
  imageCard: {
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardImage: {
    width: '100%', // Make the image responsive
    height: 250, // Set a fixed height for better visibility
    borderRadius: 10,
    resizeMode: "contain", // Use contain to maintain aspect ratio
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
  bodyText: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    color: '#333',
    textAlign: 'right',
  },
  conditionCard: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  conditionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  conditionTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  conditionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
  conditionDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  icon: {
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default SchemeDetails; 