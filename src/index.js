import React from 'react';
import { render } from 'react-dom';
import App from './App.js';
import "./App.css";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';


const reducer = (state={count: 0}, action) => {
  switch(action.type){
    case 'MORE': {
      console.log("more");
      return state = {
        ...state
      }
      break;
    }
  }
  return state;
}


let store = createStore(reducer, applyMiddleware(logger));

render(
  <Provider store={store} >
    <App />
  </Provider>
  , document.getElementById('root'));