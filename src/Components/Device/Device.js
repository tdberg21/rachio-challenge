import React, { Component } from 'react';

export default class Device extends Component {
  constructor() {
    super();
    
    this.state = {
      device: ''
    };
  }

  render() {
    let { device } = this.props;
    return (
      <div className='device-card'>
        <h3>{device.name}</h3>
      </div>
    );
  }
}