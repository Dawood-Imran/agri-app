import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

const AccountTab = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const menuItems = [
    {
      title: 'Profile',
      icon: 'person',
      route: 'farmer/Profile',
    },
    {
      title: 'Settings',
      icon: 'settings',
      route: 'farmer/Settings',
    },
    {
      title: 'Help',
      icon: 'help',
      route: 'farmer/Help',
    },
    {
      title: 'Logout',
      icon: 'logout',
      route: '/',
    },
  ];

  const handleMenuPress = (route: string) => {
    if (route === '/') {
      // Handle logout logic here
      router.push(route);
    } else {
      router.push(route as never);
    }
  };

  return (
    <ThemedView style={styles.container}>
      

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleMenuPress(item.route)}
          >
            <View style={styles.menuItemContent}>
              <Icon
                name={item.icon}
                type="material"
                color="#61B15A"
                size={24}
                style={styles.menuIcon}
              />
              <ThemedText style={styles.menuText}>{t(item.title)}</ThemedText>
            </View>
            <Icon
              name="chevron-right"
              type="material"
              color="#61B15A"
              size={24}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
 
  menuContainer: {
    backgroundColor: '#FFFFFF',
    
    borderRadius: 15,
    margin: 15,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});

export default AccountTab;
