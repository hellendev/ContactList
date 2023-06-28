import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const ContactDetailsScreen = ({ route }) => {
  const { contact } = route.params;
  const [name, setName] = useState(contact.name);

  const handleUpdateContact = async () => {
    const updatedContact = {
      ...contact,
      name: name,
    };

    try {
      const response = await fetch(`http://192.168.15.8:3000/contacts/${contact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      });

      if (response.ok) {
        // Atualização bem-sucedida, você pode tratar a resposta de acordo
        console.log('Contact updated successfully');
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Button title="Salvar" onPress={handleUpdateContact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ContactDetailsScreen;
