import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../i18n'; // Import the i18n configuration
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const headerLeft = () => (
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack() }>
      <Icon name="arrow-back" type="material" color="#FFFFFF" size={30} />
    </TouchableOpacity>
  );

  const commonHeaderOptions = {
    headerLeft,
    headerStyle: { backgroundColor: '#61B15A' },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: { fontWeight: 'bold' },
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="LanguageSelection" options={{ headerShown: false }} />
        <Stack.Screen name="UserSelectionScreen" options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} />
        <Stack.Screen name="farmer/dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="expert/dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="buyer/dashboard" options={{ headerShown: false }} />
        <Stack.Screen name = "farmer/CoinScreen" options={{ ...commonHeaderOptions,
            title: t('Coin Screen'), }} />  
        <Stack.Screen 
          name="farmer/YieldPrediction" 
          options={{ 
            ...commonHeaderOptions,
            title: t('yieldPrediction'),
          }} 
        />
        <Stack.Screen 
          name="farmer/ExpertConsultation" 
          options={{ 
            ...commonHeaderOptions,
            title: t('expertConsultation'),
          }} 
        />
        <Stack.Screen 
          name="farmer/BuyCoins" 
          options={{ 
            ...commonHeaderOptions,
            title: t('buyCoins'),
          }} 
        />
        <Stack.Screen 
          name="farmer/AuctionSystem" 
          options={{ 
            ...commonHeaderOptions,
            title: t('auctionSystem'),
          }} 
        />
        <Stack.Screen 
          name="farmer/FieldDetails" 
          options={{ 
            ...commonHeaderOptions,
            title: t('fieldDetails'),
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
}
const styles = {
  backButton: {
    marginLeft: 10,
  },
};

