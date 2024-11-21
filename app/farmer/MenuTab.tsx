import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Card, Text, Icon } from 'react-native-elements';
import { ThemedView } from '../../components/ThemedView';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/ThemedText';

const API_KEY = "33e96491c93c4bb88bc130136241209";  // Replace with your WeatherAPI key
const BASE_URL = "http://api.weatherapi.com/v1/current.json";

interface WeatherData {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
    humidity: number;
    wind_kph: number;
  };
}

const MenuTab = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=Faisalabad&aqi=no`);
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string): string => {
    const iconMap: { [key: string]: string } = {
      'Sunny': 'sun',
      'Clear': 'moon',
      'Partly cloudy': 'cloud',
      'Cloudy': 'cloud',
      'Overcast': 'cloud',
      'Mist': 'cloud',
      'Patchy rain possible': 'cloud-rain',
      'Patchy snow possible': 'cloud-snow',
      'Patchy sleet possible': 'cloud-sleet',
      'Patchy freezing drizzle possible': 'cloud-drizzle',
      'Thundery outbreaks possible': 'cloud-lightning',
      'Blowing snow': 'wind',
      'Blizzard': 'wind',
      'Fog': 'cloud',
      'Freezing fog': 'cloud',
      // ... other mappings
    };

    return iconMap[condition] || 'cloud'; // Default to 'cloud' if condition is not found
  };

  const features = [
    { 
      name: t('yieldPrediction'), 
      icon: require('../../assets/images/farmer-icons/yield.png'), 
      route: '/farmer/YieldPrediction' 
    },
    { 
      name: t('expertConsultation'), 
      icon: require('../../assets/images/farmer-icons/telemarketing.png'), 
      
      route: '/farmer/ExpertConsultation' 
    },
    { 
      name: t('auctionSystem'), 
      icon: require('../../assets/images/farmer-icons/auction.png'), 
      route: '/farmer/AuctionSystem' 
    },
    { 
      name: t('fieldDetails'), 
      icon: require('../../assets/images/farmer-icons/wheat.png'), 
      route: '/farmer/FieldDetails' 
    },
    { 
      name: t('agricultureSchemes'), 
      icon: require('../../assets/images/farmer-icons/manager.png'), 
      route: '/farmer/SchemesList' 
    },
  ];

  return (
    <ImageBackground
      source={require('../../assets/images/pexels-tamhasipkhan-11817009.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <View>
            <ThemedText style={styles.greeting}>Hello, Dawood</ThemedText>
            <ThemedText style={styles.subGreeting}>
              {weatherData ? `It's a ${weatherData.current.condition.text} day!` : 'Loading...'}
            </ThemedText>
          </View>
          <View style={styles.locationContainer}>
            <Image 
              source={require('../../assets/images/farmer-icons/weather-icons/map.png')}
              style={styles.locationIcon}
            />
            <ThemedText style={styles.locationText}>
              {weatherData?.location.name || 'Loading...'}
            </ThemedText>
          </View>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.weatherContainer}>
            <View style={styles.weatherRow}>
              <View style={styles.weatherItem}>
                <Image 
                  source={require('../../assets/images/farmer-icons/weather-icons/hot.png')}
                  style={styles.weatherIcon}
                />
                <ThemedText style={styles.weatherValue}>
                  {weatherData ? `${weatherData.current.temp_c}°C` : '--'}
                </ThemedText>
                <ThemedText style={styles.weatherLabel}>{t('temperature')}</ThemedText>
              </View>

              <View style={styles.weatherItem}>
                <Image 
                  source={require('../../assets/images/farmer-icons/weather-icons/humidity.png')}
                  style={styles.weatherIcon}
                />
                <ThemedText style={styles.weatherValue}>
                  {weatherData ? `${weatherData.current.humidity}%` : '--'}
                </ThemedText>
                <ThemedText style={styles.weatherLabel}>{t('humidity')}</ThemedText>
              </View>
            </View>

            <View style={styles.weatherRow}>
              <View style={styles.weatherItem}>
                <Image 
                  source={require('../../assets/images/farmer-icons/weather-icons/atmospheric-conditions.png')}
                  style={styles.weatherIcon}
                />
                <ThemedText style={[styles.weatherValue, { fontSize: 16 }]}>
                  {weatherData ? weatherData.current.condition.text : '--'}
                </ThemedText>
                <ThemedText style={styles.weatherLabel}>{t('condition')}</ThemedText>
              </View>

              <View style={styles.weatherItem}>
                <Image 
                  source={require('../../assets/images/farmer-icons/weather-icons/wind.png')}
                  style={styles.weatherIcon}
                />
                <ThemedText style={styles.weatherValue}>
                  {weatherData ? `${weatherData.current.wind_kph} km/h` : '--'}
                </ThemedText>
                <ThemedText style={styles.weatherLabel}>{t('windspeed')}</ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.menuContainer}>
            {features.map((feature, index) => (
              <TouchableOpacity key={index} onPress={() => router.push(feature.route as never)}>
                <View style={styles.featureCard}>
                  <View style={styles.featureContent}>
                    <Image 
                      source={feature.icon}
                      style={styles.featureIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.featureText}>{feature.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subGreeting: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 20,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  weatherContainer: {
    padding: 20,
  },
  weatherRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  weatherItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '48%',
  },
  weatherIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  weatherValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  weatherLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
  menuContainer: {
    paddingHorizontal: 15,
  },
  featureCard: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    backgroundColor: 'rgba(97, 177, 90, 0.9)',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  featureIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  featureText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default MenuTab;
