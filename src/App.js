import React, { Component } from 'react';
import './App.css';
import Register from './Register'
import Countctt from './Countctt'

export default class App extends Component {

  render() {
    return (
      <div>
        <div>
          <Countctt/>
          {/* <Register/> */}
        </div>
      </div>
    );
  }
}
