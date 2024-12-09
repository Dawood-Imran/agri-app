import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';

const Profile = () => {
  const expertDetails = {
    name: 'Dr. Ahmed Khan',
    specialization: 'Agricultural Scientist',
    experience: '15 years',
    phone: '995-057-5065',
    email: 'dr.ahmed@agroboost.com',
    education: 'PhD in Agricultural Sciences',
    rating: '4.8',
    consultations: '250+'
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.imageContainer}>
         
          <ThemedText style={styles.name}>Dr. {expertDetails.name}</ThemedText>
          <ThemedText style={styles.specialization}>{expertDetails.specialization}</ThemedText>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>{expertDetails.rating}</ThemedText>
            <ThemedText style={styles.statLabel}>Rating</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>{expertDetails.consultations}</ThemedText>
            <ThemedText style={styles.statLabel}>Consultations</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>{expertDetails.experience}</ThemedText>
            <ThemedText style={styles.statLabel}>Experience</ThemedText>
          </View>
        </View>

        <View style={styles.detailRow}>
          <ThemedText style={styles.label}>Education</ThemedText>
          <ThemedText style={styles.value}>{expertDetails.education}</ThemedText>
        </View>
        <View style={styles.detailRow}>
          <ThemedText style={styles.label}>Phone</ThemedText>
          <ThemedText style={styles.value}>{expertDetails.phone}</ThemedText>
        </View>
        <View style={styles.detailRow}>
          <ThemedText style={styles.label}>Email</ThemedText>
          <ThemedText style={styles.value}>{expertDetails.email}</ThemedText>
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
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#61B15A',
    borderRadius: 15,
    marginBottom: 20,
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
  specialization: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 5,
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#61B15A',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
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
});

export default Profile; 