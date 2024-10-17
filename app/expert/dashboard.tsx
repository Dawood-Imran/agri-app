import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import MessagesTab from './MessagesTab';
import AccountTab from './AccountTab';

const Tab = createBottomTabNavigator();

const ExpertDashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Messages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
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
      <Tab.Screen name="Messages" component={MessagesTab} />
      <Tab.Screen name="Account" component={AccountTab} />
    </Tab.Navigator>
  );
};

export default ExpertDashboard;
