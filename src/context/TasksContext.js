import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { tasksAPI } from '../services/api';

const TasksContext = createContext();

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
        isLoading: false,
        error: null,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        isLoading: false,
        error: null,
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        ),
        isLoading: false,
        error: null,
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload),
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const fetchTasks = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await tasksAPI.getTasks();
      dispatch({ type: 'SET_TASKS', payload: response.data.tasks });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.message || 'Failed to fetch tasks',
      });
    }
  }, []);

  const createTask = async (taskData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await tasksAPI.createTask(taskData);
      dispatch({ type: 'ADD_TASK', payload: response.data.task });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create task';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await tasksAPI.updateTask(id, taskData);
      dispatch({ type: 'UPDATE_TASK', payload: response.data.task });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update task';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const deleteTask = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await tasksAPI.deleteTask(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete task';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, message };
    }
  };

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value = {
    ...state,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    clearError,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};