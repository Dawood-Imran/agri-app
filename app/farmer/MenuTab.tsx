import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Card, Text, Icon } from 'react-native-elements';
import { ThemedView } from '../../components/ThemedView';

const API_KEY = "33e96491c93c4bb88bc130136241209";  // Replace with your WeatherAPI key
const BASE_URL = "http://api.weatherapi.com/v1/current.json";

const MenuTab = () => {
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

  const features = [
    { name: 'Yield Prediction', icon: 'chart-line' },
    { name: 'Expert Consultation', icon: 'video' },
    { name: 'Buy Coins', icon: 'coins' },
    { name: 'Auction System', icon: 'gavel' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <Card containerStyle={styles.weatherCard}>
          <Text style={styles.weatherTitle}>Current Weather</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : weatherData ? (
            <View>
              <Text style={styles.weatherText}>Location: {weatherData.location.name}</Text>
              <Text style={styles.weatherText}>Temperature: {weatherData.current.temp_c}°C</Text>
              <Text style={styles.weatherText}>Condition: {weatherData.current.condition.text}</Text>
              <Text style={styles.weatherText}>Humidity: {weatherData.current.humidity}%</Text>
            </View>
          ) : (
            <Text style={styles.weatherText}>Failed to load weather data</Text>
          )}
        </Card>
        {features.map((feature, index) => (
          <Card key={index} containerStyle={styles.featureCard}>
            <Icon name={feature.icon} type="font-awesome-5" size={30} color="#61B15A" />
            <Text style={styles.featureText}>{feature.name}</Text>
          </Card>
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
  weatherText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5,
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
