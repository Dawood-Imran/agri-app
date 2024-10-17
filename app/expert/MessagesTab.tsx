import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { ThemedView } from '../../components/ThemedView';

const MessagesTab = () => {
  const messages = [
    { id: 1, name: 'John Doe', message: 'Hello, I need advice on my crops.', time: '10:30 AM' },
    { id: 2, name: 'Jane Smith', message: 'When is the best time to plant wheat?', time: '11:45 AM' },
    // Add more sample messages as needed
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {messages.length > 0 ? (
          messages.map((message) => (
            <Card key={message.id} containerStyle={styles.messageCard}>
              <View style={styles.messageHeader}>
                <View style={styles.messageInfo}>
                  <Text style={styles.name}>{message.name}</Text>
                  <Text style={styles.time}>{message.time}</Text>
                </View>
              </View>
              <Text style={styles.messageText}>{message.message}</Text>
            </Card>
          ))
        ) : (
          <Text style={styles.noMessagesText}>No messages yet.</Text>
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
  messageCard: {
    borderRadius: 10,
    marginBottom: 10,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  messageInfo: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
  messageText: {
    fontSize: 14,
  },
  noMessagesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default MessagesTab;
