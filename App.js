import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ContactsScreen from './assets/screens/ContactsScreen';
import AddContactScreen from './assets/screens/AddContactScreen';
import ContactDetailsScreen from './assets/screens/ContactDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Contatos"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3f51b5',
            textAlign: 'center',
  
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 20,
            textAlign: 'center',
            paddingLeft: 10
          },
        }}
      >
        <Stack.Screen
          name="Contatos"
          component={ContactsScreen}
          options={{
            title: 'Contatos',
          }}
        />
        <Stack.Screen
          name="AddContact"
          component={AddContactScreen}
          options={{
            title: 'Adicionar Contato',
          }}
        />
        <Stack.Screen
          name="ContactDetails"
          component={ContactDetailsScreen}
          options={{
            title: 'Detalhes do Contato',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
