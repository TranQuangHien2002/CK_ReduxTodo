// src/screens/Home.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser} from '../redux/actions';
import { addTodo} from '../redux/actions';
import {  deleteTodo } from '../redux/actions';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(clearUser());
    navigation.navigate('Login');
  };


  // State for handling new todo input
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const todo = { id: new Date().getTime(), name: newTodo, complete: false };
      dispatch(addTodo(todo));
      setNewTodo('');
      Keyboard.dismiss();
    }
  };

  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodo(todoId));
  };


  const handleEditTodo = (todoId) => {
    navigation.navigate('EditTodo', { todoId }); // Navigate to EditTodo screen with the todoId
  };
  
  return (
    <View style={styles.container}>
      <Text>Welcome, {user ? user.name : 'Guest'}!</Text>
      <Text>Todo List:</Text>

      {/* Input for adding a new todo */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Todo"
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.buttonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>

      {/* Display todos and provide delete functionality */}
      {user && user.todos && user.todos.length > 0 ? (
        <FlatList
          data={user.todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <Text>{item.name}</Text>
              <Text>Hoàn thành: {item.complete ? 'Có' : 'Không'}</Text>
              
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteTodo(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.editButton} // Add this style
                onPress={() => handleEditTodo(item.id)} // Add onPress handler
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text>No todos available.</Text>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#1877f2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
});

export default Home;
