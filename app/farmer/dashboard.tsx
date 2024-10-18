import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import MenuTab from './MenuTab';
import AccountTab from './AccountTab';

const Tab = createBottomTabNavigator();

const FarmerDashboard = () => {
  const { t } = useTranslation();

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
      })}
    >
      <Tab.Screen name={t('menu')} component={MenuTab} />
      <Tab.Screen name={t('account')} component={AccountTab} />
    </Tab.Navigator>
  );
};

export default FarmerDashboard;
