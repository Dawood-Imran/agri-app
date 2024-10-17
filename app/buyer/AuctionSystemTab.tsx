import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { ThemedView } from '../../components/ThemedView';

const AuctionSystemTab = () => {
  // This is a placeholder. In the future, this will be populated with actual auction items.
  const auctionItems = [];

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {auctionItems.length > 0 ? (
          auctionItems.map((item, index) => (
            <Card key={index} containerStyle={styles.auctionCard}>
              {/* Auction item details will go here */}
            </Card>
          ))
        ) : (
          <Text style={styles.noItemsText}>No auction items available at the moment.</Text>
        )}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  auctionCard: {
    borderRadius: 10,
    marginBottom: 10,
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default AuctionSystemTab;
