import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, ImageBackground } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Card, Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import schemes from '../../assets/scraped_data.json';

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
      source={require('../../assets/images/gettyimages-1068196174-612x612.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
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
      </View>
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
    minHeight: 100,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  schemeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'right',
    lineHeight: 28,
    paddingVertical: 5,
    marginRight: 10,
  },
  chevron: {
    padding: 5,
  },
});

export default SchemesList; 