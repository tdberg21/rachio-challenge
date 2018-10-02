import React, { Component } from 'react';
import './App.css';
import { fetchUserId, fetchUserInfo } from '../../helpers/apiCalls.js';
import { apiKey } from '../../helpers/apiKey.js';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      userId: '',
      user: {}
    }
  };

  componentDidMount() {
     this.fetchUserId(); 
  }

  fetchUserId() {
    const url = 'https://api.rach.io/1/public/person/info'
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    })
    .then(response => response.json())
    .then(response => this.fetchUserInfo(response.id))
  };

  fetchUserInfo(userId) {
    const url = `https://api.rach.io/1/public/person/${userId}`
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
      devices: userInfo.devices
    };
    this.setState({
      user
    })
  }

  displayDevices(deviceList) {
    let devices;
    if (deviceList) {
      
    devices = deviceList.map(device => {
      console.log(device);
    <div>Device</div>})
    }
    return devices;
  }

  render() {
    if (!this.state.user && !this.state.user.devices) {
      return (
      <div>
        App
      </div>
    )
    } else {
      return (
        <div>
          {this.displayDevices(this.state.user.devices)}
        </div>
      )
    }
    
  };
}