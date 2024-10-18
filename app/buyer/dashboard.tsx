import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import AuctionSystemTab from './AuctionSystemTab';
import AccountTab from './AccountTab';

const Tab = createBottomTabNavigator();

const BuyerDashboard = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === t('auctionSystem')) {
            iconName = focused ? 'gavel' : 'gavel';
          } else if (route.name === t('account')) {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName as string} type={route.name === t('auctionSystem') ? 'font-awesome-5' : 'ionicon'} size={size} color={color} />;
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
      <Tab.Screen name={t('auctionSystem')} component={AuctionSystemTab} />
      <Tab.Screen name={t('account')} component={AccountTab} />
    </Tab.Navigator>
  );
};

export default BuyerDashboard;
