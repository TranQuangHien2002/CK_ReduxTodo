// src/redux/actions.js

export const setUser = (user) => ({ type: 'SET_USER', user });
export const clearUser = () => ({ type: 'CLEAR_USER' });

//CRUD
export const addTodo = (todo) => ({ type: 'ADD_TODO', todo });
export const deleteTodo = (todoId) => ({ type: 'DELETE_TODO', todoId });
export const updateTodo = (todo) => ({ type: 'UPDATE_TODO', todo });

