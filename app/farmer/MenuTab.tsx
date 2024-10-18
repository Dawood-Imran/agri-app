import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card, Text, Icon } from 'react-native-elements';
import { ThemedView } from '../../components/ThemedView';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

const API_KEY = "33e96491c93c4bb88bc130136241209";  // Replace with your WeatherAPI key
const BASE_URL = "http://api.weatherapi.com/v1/current.json";

const MenuTab = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=Lahore&aqi=no`);
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    // Map weather conditions to appropriate icons
    const iconMap = {
      'Sunny': 'sun',
      'Clear': 'moon',
      'Partly cloudy': 'cloud',
      'Cloudy': 'cloudy',
      'Overcast': 'cloud',
      'Mist': 'water',
      'Patchy rain possible': 'cloud-rain',
      'Patchy snow possible': 'cloud-snow',
      'Patchy sleet possible': 'cloud-sleet',
      'Patchy freezing drizzle possible': 'cloud-drizzle',
      'Thundery outbreaks possible': 'cloud-lightning',
      'Blowing snow': 'wind',
      'Blizzard': 'wind',
      'Fog': 'water',
      'Freezing fog': 'water',
      'Patchy light drizzle': 'cloud-drizzle',
      'Light drizzle': 'cloud-drizzle',
      'Freezing drizzle': 'cloud-drizzle',
      'Heavy freezing drizzle': 'cloud-drizzle',
      'Patchy light rain': 'cloud-rain',
      'Light rain': 'cloud-rain',
      'Moderate rain at times': 'cloud-rain',
      'Moderate rain': 'cloud-rain',
      'Heavy rain at times': 'cloud-rain',
      'Heavy rain': 'cloud-rain',
      'Light freezing rain': 'cloud-rain',
      'Moderate or heavy freezing rain': 'cloud-rain',
      'Light sleet': 'cloud-sleet',
      'Moderate or heavy sleet': 'cloud-sleet',
      'Patchy light snow': 'cloud-snow',
      'Light snow': 'cloud-snow',
      'Patchy moderate snow': 'cloud-snow',
      'Moderate snow': 'cloud-snow',
      'Patchy heavy snow': 'cloud-snow',
      'Heavy snow': 'cloud-snow',
      'Ice pellets': 'cloud-snow',
      'Light rain shower': 'cloud-rain',
      'Moderate or heavy rain shower': 'cloud-rain',
      'Torrential rain shower': 'cloud-rain',
      'Light sleet showers': 'cloud-sleet',
      'Moderate or heavy sleet showers': 'cloud-sleet',
      'Light snow showers': 'cloud-snow',
      'Moderate or heavy snow showers': 'cloud-snow',
      'Light showers of ice pellets': 'cloud-snow',
      'Moderate or heavy showers of ice pellets': 'cloud-snow',
      'Patchy light rain with thunder': 'cloud-lightning-rain',
      'Moderate or heavy rain with thunder': 'cloud-lightning-rain',
      'Patchy light snow with thunder': 'cloud-lightning-snow',
      'Moderate or heavy snow with thunder': 'cloud-lightning-snow',
    };

    return iconMap[condition] || 'help-circle'; // Default icon if condition is not found
  };

  const features = [
    { name: t('yieldPrediction'), icon: 'chart-line', route: '/farmer/YieldPrediction' },
    { name: t('expertConsultation'), icon: 'video', route: '/farmer/ExpertConsultation' },
    { name: t('buyCoins'), icon: 'coins', route: '/farmer/BuyCoins' },
    { name: t('auctionSystem'), icon: 'gavel', route: '/farmer/AuctionSystem' },
    { name: t('fieldDetails'), icon: 'seedling', route: '/farmer/FieldDetails' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <Card containerStyle={styles.weatherCard}>
          <Text style={styles.weatherTitle}>{t('currentWeather')}</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : weatherData ? (
            <View style={styles.weatherContent}>
              <Icon
                name={getWeatherIcon(weatherData.current.condition.text)}
                type="feather"
                color="#FFFFFF"
                size={50}
              />
              <View style={styles.weatherInfo}>
                <Text style={styles.weatherText}>{t('location')}: {weatherData.location.name}</Text>
                <Text style={styles.weatherText}>
                  {t('temperature')}: {weatherData.current.temp_c}
                  <Text style={styles.degreeSymbol}>°C</Text>
                </Text>
                <Text style={styles.weatherText}>{t('condition')}: {weatherData.current.condition.text}</Text>
                <Text style={styles.weatherText}>{t('humidity')}: {weatherData.current.humidity}%</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.weatherText}>{t('failedToLoadWeather')}</Text>
          )}
        </Card>
        {features.map((feature, index) => (
          <TouchableOpacity key={index} onPress={() => router.push(feature.route)}>
            <Card containerStyle={styles.featureCard}>
              <Icon name={feature.icon} type="font-awesome-5" size={30} color="#61B15A" />
              <Text style={styles.featureText}>{feature.name}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  weatherCard: {
    backgroundColor: '#61B15A',
    borderRadius: 10,
    marginBottom: 20,
  },
  weatherTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weatherContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherInfo: {
    marginLeft: 20,
  },
  weatherText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5,
  },
  degreeSymbol: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 20,
    textAlignVertical: 'top',
  },
  featureCard: {
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
  featureText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default MenuTab;
