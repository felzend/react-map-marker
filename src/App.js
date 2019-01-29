import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RootContainer from './RootContainer';
import rootReducer from './Reducers';
import './App.css';

const store = createStore(rootReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer/>
      </Provider>
    );
  }
}

export default App;
