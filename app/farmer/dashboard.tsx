import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import MenuTab from './MenuTab';
import AccountTab from './AccountTab';

const Tab = createBottomTabNavigator();

const FarmerDashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Menu') {
            iconName = focused ? 'menu' : 'menu-outline';
          } else if (route.name === 'Account') {
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
      <Tab.Screen name="Menu" component={MenuTab} />
      <Tab.Screen name="Account" component={AccountTab} />
    </Tab.Navigator>
  );
};

export default FarmerDashboard;
