import React from 'react';
import { StyleSheet, View , Image} from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';

const Profile = () => {
  const farmerDetails = {
    name: 'Dawood Imran',
    phone: '995-057-5065',
    city: 'Faisalabad',
    address: '34 st. London'
  };

  return (
    <ThemedView style={styles.container}>
        <View style={styles.profileSection}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../assets/images/farmer-icons/farmer.png')}
            style={styles.profileImage}
          />
          <ThemedText style={styles.name}>Hi! Dawood Imran</ThemedText>
        </View>
      </View>
      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <ThemedText style={styles.label}>Name</ThemedText>
          <ThemedText style={styles.value}>{farmerDetails.name}</ThemedText>
        </View>
        <View style={styles.detailRow}>
          <ThemedText style={styles.label}>Phone</ThemedText>
          <ThemedText style={styles.value}>{farmerDetails.phone}</ThemedText>
        </View>
        <View style={styles.detailRow}>
          <ThemedText style={styles.label}>City</ThemedText>
          <ThemedText style={styles.value}>{farmerDetails.city}</ThemedText>
        </View>
        <View style={styles.detailRow}>
          <ThemedText style={styles.label}>Address</ThemedText>
          <ThemedText style={styles.value}>{farmerDetails.address}</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: 15,

  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  detailRow: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#61B15A',
  },
  imageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
});

export default Profile; 