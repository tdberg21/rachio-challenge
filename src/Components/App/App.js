import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      user: {}
    }
  }

  render() {
    return (
      <div>
        App
      </div>
    )
  }
}