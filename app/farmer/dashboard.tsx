import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import MenuTab from './MenuTab';
import AccountTab from './AccountTab';
import CoinScreen from './CoinScreen';
import CoinDisplay from '../../components/CoinDisplay';

const Tab = createBottomTabNavigator();

const FarmerDashboard = () => {
  const { t } = useTranslation();
  const [coins, setCoins] = useState(100); // Example initial value
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === t('menu')) {
            iconName = focused ? 'menu' : 'menu-outline';
          } else if (route.name === t('account')) {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName as string} type="ionicon" size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFC107',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#61B15A',
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: '#61B15A',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Coins' as never)}>
            <CoinDisplay coins={coins} />
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen name={t('menu')} component={MenuTab} />
      <Tab.Screen name={t('account')} component={AccountTab} />
      <Tab.Screen 
        name="Coins" 
        component={CoinScreen} 
        options={{ tabBarButton: () => null }}
      />
    </Tab.Navigator>
  );
};

export default FarmerDashboard;
