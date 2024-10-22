import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { ThemedText } from './ThemedText';

interface CoinDisplayProps {
  coins: number;
}

const CoinDisplay: React.FC<CoinDisplayProps> = ({ coins }) => {
  return (
    <View style={styles.container}>
      <Icon name="coins" type="font-awesome-5" color="#FFC107" size={20} />
      <ThemedText style={styles.coinText}>{coins}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  coinText: {
    color: '#FFC107',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 16,
  },
});

export default CoinDisplay;
