import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const CoinScreen = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [balance, setBalance] = React.useState(500);
  const [consultations, setConsultations] = React.useState([
    { id: 1, farmer: 'John Doe', duration: '30 min', coins: 50, date: '2023-05-01' },
    { id: 2, farmer: 'Jane Smith', duration: '45 min', coins: 75, date: '2023-04-28' },
  ]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon 
          name="arrow-back" 
          type="material" 
          color="#FFC107" 
          size={30} 
          onPress={() => navigation.goBack()} 
          containerStyle={{ marginLeft: 10 }}
        />
      ),
    });
  }, [navigation]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.balanceCard}>
          <ThemedText style={styles.balanceTitle}>
            {i18n.language === 'ur' ? 'کمائے گئے کوائنز کا بیلنس' : t('Earned Coins Balance')}
          </ThemedText>
          <ThemedText style={styles.balance}>
            {balance} {i18n.language === 'ur' ? 'ایگرو کوائنز' : t('agroCoins')}
          </ThemedText>
        </View>
        
        <View style={styles.card}>
          <ThemedText style={styles.sectionTitle}>
            {i18n.language === 'ur' ? 'مشاورت کی تاریخ' : t('Consultation History')}
          </ThemedText>
          {consultations.map((item, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.farmer}</ListItem.Title>
                <ListItem.Subtitle>{item.date} - {item.duration}</ListItem.Subtitle>
              </ListItem.Content>
              <ThemedText style={styles.earned}>+{item.coins}</ThemedText>
            </ListItem>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    padding: 20,
  },
  balanceCard: {
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#61B15A',
  },
  balanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
    paddingBottom: 10,
    paddingTop: 20,
  },
  card: {
    borderRadius: 10,
    marginBottom: 20,
    padding: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  earned: {
    color: 'green',
  },
  button: {
    backgroundColor: '#FFC107',
    borderRadius: 25,
  },
  buttonTitle: {
    color: '#1B5E20',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default CoinScreen;
