import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './index.css';

class App extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div>
        App
      </div>
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app')
);