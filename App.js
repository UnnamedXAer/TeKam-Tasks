import React from 'react';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './Navigation/AppNavigator';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import contextMenuReducer from './store/reducers/contextMenu';
import tasksReducer from './store/reducers/tasks';
import authReducer from './store/reducers/auth';
import Menu from './Components/Menu';

const rootReducer = combineReducers({
  contextMenu: contextMenuReducer,
  auth: authReducer,
  tasks: tasksReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(reduxThunkMiddleware)
));

enableScreens();

export default function App() {

  return (
    <Provider store={store}>
      <AppNavigator />
      <Menu />
    </Provider>
  );
}