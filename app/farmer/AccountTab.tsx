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

  // This would come from your user state/context in a real app
  const farmerDetails = {
    name: 'Dawood Imran',
    phone: '995-057-5065',
    city: 'Faisalabad',
    address: '34 st. London'
  };

  const handleEditDetails = () => {
    // Navigate to edit profile screen
    router.push('/farmer/EditProfile');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../assets/images/farmer-icons/farmer.png')}
            style={styles.profileImage}
          />
          <ThemedText style={styles.changeImageText}>Change Image</ThemedText>
        </View>
        <ThemedText style={styles.name}>{farmerDetails.name}</ThemedText>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.cardHeader}>
          <ThemedText style={styles.cardTitle}>{t('personalDetails')}</ThemedText>
          <TouchableOpacity onPress={handleEditDetails} style={styles.editButton}>
            <Icon name="edit" type="material" color="#61B15A" size={24} />
            <ThemedText style={styles.editText}>{t('update')}</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>{t('phone')}</ThemedText>
            <ThemedText style={styles.value}>{farmerDetails.phone}</ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>{t('city')}</ThemedText>
            <ThemedText style={styles.value}>{farmerDetails.city}</ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>{t('address')}</ThemedText>
            <ThemedText style={styles.value}>{farmerDetails.address}</ThemedText>
          </View>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  changeImageText: {
    color: '#FFC107',
    fontSize: 14,
    marginTop: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    margin: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    color: '#61B15A',
    marginLeft: 5,
    fontSize: 16,
  },
  detailsContainer: {
    gap: 15,
  },
  detailRow: {
    marginBottom: 10,
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

export default AccountTab;
