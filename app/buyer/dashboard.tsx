import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import AuctionSystemTab from './AuctionSystemTab';
import AccountTab from './AccountTab';

const Tab = createBottomTabNavigator();

const BuyerDashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Auction System') {
            iconName = focused ? 'gavel' : 'gavel';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName as string} type={route.name === 'Auction System' ? 'font-awesome-5' : 'ionicon'} size={size} color={color} />;
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
      <Tab.Screen name="Auction System" component={AuctionSystemTab} />
      <Tab.Screen name="Account" component={AccountTab} />
    </Tab.Navigator>
  );
};

export default BuyerDashboard;
