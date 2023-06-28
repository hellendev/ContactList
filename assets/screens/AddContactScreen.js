import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddContactScreen = ({ navigation, route }) => {
  const { handleAddContact } = route.params;
  const [name, setName] = useState('');


  const handleSaveContact = async () => {
    const newContact = {
      name: name,
    };
  
    try {
      const response = await fetch('http://192.168.15.8:3000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });
  
      if (response.ok) {
        const data = await response.json();
        newContact.id = data.id;
        handleAddContact(newContact); // Atualiza o estado imediatamente
        navigation.goBack();
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
        placeholder="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Button title="Salvar" onPress={handleSaveContact} />
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

export default AddContactScreen;