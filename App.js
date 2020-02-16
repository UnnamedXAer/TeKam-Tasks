import React from 'react';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './Navigation/AppNavigator';
import tasksReducer from './store/reducers/tasks';
import authReducer from './store/reducers/auth';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer
});

const store = createStore(rootReducer, applyMiddleware(reduxThunkMiddleware));

enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}