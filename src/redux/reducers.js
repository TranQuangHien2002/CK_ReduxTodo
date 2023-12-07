// src/redux/reducers.js

const initialState = {
    user: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: action.user,
        };
      case 'CLEAR_USER':
        return {
          ...state,
          user: null,
        };
      //CRUD
      case 'ADD_TODO':
        return {
          ...state,
          user: {
            ...state.user,
            todos: [...state.user.todos, action.todo],
          },
        };
  
      case 'DELETE_TODO':
        const deleteTodos = state.user.todos.filter(
          (todo) => todo.id !== action.todoId
        );
        return {
          ...state,
          user: {
            ...state.user,
            todos: deleteTodos,
          },
        };
        case 'UPDATE_TODO':
          const updatedTodos = state.user.todos.map((todo) =>
            todo.id === action.todo.id ? action.todo : todo
          );
          return {
            ...state,
            user: {
              ...state.user,
              todos: updatedTodos,
            },
          };
          
      default:
        return state;
    }
  };
  
  export default reducer;
  