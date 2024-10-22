import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, ListItem, Icon } from 'react-native-elements';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const CoinScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [balance, setBalance] = React.useState(1000); // Example balance
  const [transactions, setTransactions] = React.useState([
    { id: 1, type: 'Spent', amount: 200, item: 'Wheat Auction', date: '2023-05-01' },
    { id: 2, type: 'Bought', amount: 500, item: 'Coin Purchase', date: '2023-04-28' },
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
          <ThemedText style={styles.balanceTitle}>{t('Current Balance')}</ThemedText>
          <ThemedText style={styles.balance}>{balance} {t('agroCoins')}</ThemedText>
        </View>
        <Button
          title={t('buyCoins')}
          onPress={() => {/* Implement coin purchase */}}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          containerStyle={styles.buttonContainer}
        />
        <View style={styles.card}>
          <ThemedText style={styles.sectionTitle}>{t('Transaction History')}</ThemedText>
          {transactions.map((item, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.item}</ListItem.Title>
                <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
              </ListItem.Content>
              <ThemedText style={item.type === 'Spent' ? styles.spent : styles.bought}>
                {item.type === 'Spent' ? '-' : '+'}{item.amount}
              </ThemedText>
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
  spent: {
    color: 'red',
  },
  bought: {
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
