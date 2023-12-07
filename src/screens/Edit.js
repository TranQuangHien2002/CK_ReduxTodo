// src/screens/EditTodo.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo } from '../redux/actions';

const EditTodo = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { todoId } = route.params;
  const [editedTodo, setEditedTodo] = useState('');

  useEffect(() => {
    const todo = user.todos.find((todo) => todo.id === todoId);
    setEditedTodo(todo.name);
  }, [todoId, user.todos]);

  const handleUpdateTodo = () => {
    if (editedTodo.trim() !== '') {
      const updatedTodo = {
        id: todoId,
        name: editedTodo,
        complete: false,
      };
      dispatch(updateTodo(updatedTodo));
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Todo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Edit Todo"
        value={editedTodo}
        onChangeText={(text) => setEditedTodo(text)}
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateTodo}>
        <Text style={styles.buttonText}>Update Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditTodo;
