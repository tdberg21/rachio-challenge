import React, { Component } from 'react';
import './App.css';
import { apiKey } from '../../helpers/apiKey.js';
import DeviceContainer from '../DeviceContainer/DeviceContainer.js';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      userId: '',
      user: {}
    };
  }

  componentDidMount() {
    this.fetchUserId(); 
  }

  fetchUserId() {
    const url = 'https://api.rach.io/1/public/person/info';
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    })
      .then(response => response.json())
      .then(response => this.fetchUserInfo(response.id));
  }

  fetchUserInfo(userId) {
    const url = `https://api.rach.io/1/public/person/${userId}`;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    })
      .then(response => response.json())
      .then(response => this.scrubUserInfo(response));
  }

  scrubUserInfo(userInfo) {
    const user = {
      id: userInfo.id,
      name: userInfo.fullName,
      devices: this.scrubDeviceInfo(userInfo.devices)
    };
    this.setState({
      user
    });
  }

  scrubDeviceInfo(devices) {
    let cleanDevices = devices.map(device => {
      return {
        id: device.id,
        name: device.name,
        model: device.model,
        timeZone: device.timeZone,
        zones: device.zones,
        status: device.status,
        on: device.on
      };
    });
    return cleanDevices;
  }

  render() {
    if (!this.state.user && !this.state.user.devices) {
      return (
        <div>
        App
        </div>
      );
    } else {
      return (
        <div>
          <DeviceContainer devices={this.state.user.devices} />
        </div>
      );
    }
    
  }
}