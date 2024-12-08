import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
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
      route: 'expert/Profile',
      description: 'View and edit your profile'
    },
    {
      title: 'Settings',
      icon: 'settings',
      route: 'expert/Settings',
      description: 'App preferences and settings'
    },
    
    {
      title: 'Help',
      icon: 'help',
      route: 'expert/Help',
      description: 'Get support and assistance'
    },
    {
      title: 'Logout',
      icon: 'logout',
      route: '/',
      description: 'Sign out from your account'
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
            style={[
              styles.menuItem,
              index === menuItems.length - 1 && styles.lastItem
            ]}
            onPress={() => handleMenuPress(item.route)}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.iconContainer}>
                <Icon
                  name={item.icon}
                  type="material"
                  color="#61B15A"
                  size={24}
                />
              </View>
              <View style={styles.textContainer}>
                <ThemedText style={styles.menuText}>{t(item.title)}</ThemedText>
                <ThemedText style={styles.menuDescription}>{item.description}</ThemedText>
              </View>
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
    padding: 15,
    justifyContent: 'center',
    
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
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
  lastItem: {
    borderBottomWidth: 0,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  menuDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default AccountTab;
