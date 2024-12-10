import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import MessagesTab from './MessagesTab';
import AccountTab from './AccountTab';
import CoinScreen from './CoinScreen';
import CoinDisplay from '../../components/CoinDisplay';

const Tab = createBottomTabNavigator();

const ExpertDashboard = () => {
  const { t } = useTranslation();
  const [coins, setCoins] = useState(500); // Example initial value
  const navigation = useNavigation();

  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === t('messages')) {
          iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
        } else if (route.name === t('account')) {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Icon name={iconName as string} type="ionicon" size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FFC107',
      tabBarInactiveTintColor: '#FFFFFF',
      tabBarStyle: {
        backgroundColor: '#61B15A',
        height: 60, // Adjust for consistent height
        paddingVertical: 5, // Similar to FarmerDashboard
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
        <TouchableOpacity
          onPress={() => navigation.navigate('expert/CoinScreen' as never)}
          style={{ marginRight: 15 }} // Align with FarmerDashboard
        >
          <CoinDisplay coins={coins} />
        </TouchableOpacity>
      ),
    })}
  >
    <Tab.Screen 
      name={t('messages')} 
      component={MessagesTab} 
      options={{
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }, // Match FarmerDashboard
      }}
    />
    <Tab.Screen 
      name={t('account')} 
      component={AccountTab} 
      options={{
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }, // Match FarmerDashboard
      }}
    />
    <Tab.Screen 
      name="Coins" 
      component={CoinScreen} 
      options={{ tabBarButton: () => null }}
    />
  </Tab.Navigator>

  );
};

export default ExpertDashboard;
