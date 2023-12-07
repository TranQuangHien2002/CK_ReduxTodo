// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import EditTodo from './src/screens/Edit'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="EditTodo" component={EditTodo} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
