import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Card, Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import schemes from '../../assets/scraped_data.json';

// Import the images
const backgroundImage = require('../../assets/images/farmer-icons/pexels-saeed-ahmed-abbasi-480825745-16446598.jpg');

const SchemesList = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  const handleSchemePress = React.useCallback((schemeIndex: number) => {
    router.push({ 
      pathname: '/farmer/SchemeDetails' as any,
      params: { schemeIndex }
    });
  }, [router]);

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
      headerTitle: t('agricultureSchemes'),
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
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ThemedView style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Display the provided text for existing schemes */}
          <View style={styles.textContainer}>
            <ThemedText style={styles.titleText}>
              کل کے لیے سرمایہ کاری
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              کاشتکاروں اور زرعی صنعت کاروں کی ضروریات کو پورا کرنے کے لیے زرعی ترقیاتی بینک لیڈ چھوٹے کسانوں کے ان کے مالی ضروریات پورا کرنے اور اپنے کنبوں کے لیے بہتر زندگی گزارنے کے لیے مالی تحفظ کے مسائل اور رہن کی بنیاد پر جدید زرعی سپلائی اور سروسز کی شناخت کرنے میں مدد کرنے کے لیے جدید اقدامات کرنے کی کوشش کرتا ہے۔
            </ThemedText>
          </View>

          

          {schemes.map((scheme, index) => (
            <TouchableOpacity 
              key={index}
              onPress={() => handleSchemePress(index)}
            >
              <Card containerStyle={styles.card}>
                <View style={styles.cardContent}>
                  <ThemedText style={styles.schemeTitle} numberOfLines={2}>
                    {scheme.Title}
                  </ThemedText>
                  <Icon
                    name="chevron-right"
                    type="material"
                    color="#61B15A"
                    size={24}
                    containerStyle={[
                      styles.chevron,
                      { transform: [{ scaleX: i18n.language === 'ur' ? -1 : 1 }] }
                    ]}
                  />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better readability
  },
  scrollContent: {
    padding: 15,
    paddingTop: 15,
  },
  textContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background for text
    borderRadius: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'justify',
  },
  tractorImage: {
    width: '100%', // Make the image responsive
    height: 200, // Set a fixed height or adjust as needed
    borderRadius: 10,
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
    marginBottom: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slightly transparent cards
  },
  schemeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'right',
    lineHeight: 28,
  },
  chevron: {
    padding: 5,
  },
});

export default SchemesList; 