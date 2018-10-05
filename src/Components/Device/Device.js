import React, { Component } from 'react';
import ZoneContainer from '../ZoneContainer/ZoneContainer.js';
import { apiKey } from '../../helpers/apiKey.js';

export default class Device extends Component {
  constructor() {
    super();
    
    this.state = {
      zones: [],
      duration: 0,
      status: []
    };
    this.scrubZones = this.scrubZones.bind(this);
    this.handleDisplayZones = this.handleDisplayZones.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.activateAllZones = this.activateAllZones.bind(this);
    this.activateZone = this.activateZone.bind(this);
  }

  scrubZones(zone) {
    let {
      id, name, zoneNumber, enabled, lastWateredDate, maxRuntime, imageUrl
    } = zone;
    let zoneInfo = {
      id, name, zoneNumber, enabled, lastWateredDate, maxRuntime, imageUrl
    };
    return zoneInfo;
  }

  handleDisplayZones(zones) {
    if (this.state.zones.length) {
      this.setState({
        zones: []
      });

    } else {
      let cleanZones = zones.map(zone => this.scrubZones(zone));
      this.setState({
        zones: cleanZones
      });
    }
  }

  handleChange(event) {
    let duration = event.target.value;
    this.setState({
      duration
    });
  }

  activateAllZones(zones) {
    zones.forEach(zone => this.activateZone(zone.id));
  }

  activateZone(id) {
    const duration = parseInt(this.state.duration);
    fetch('https://api.rach.io/1/public/zone/start', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        id,
        duration
      })
    })
      .then((response) => this.setState({
        status: [...this.state.status, response.status]
      }))
      .catch(error => this.setState({ message: `Error!` }));
  }

  render() {
    let { device } = this.props;
    return (
      <div className='device-card-container'>
        <div className='device-card'>
          <section className='device-card-text-section'>
            <h3 className='device-card-text'>{device.name}</h3>
            <p className='device-card-text'>Model: {device.model}</p>
            <p className='device-card-text'>Status: {device.status}</p>
            <p className='device-card-text'>Zones: {device.zones.length}</p>
            <button
              onClick={() => this.handleDisplayZones(device.zones)}
              className='buttons display-zones-button'
              value={device.id} >
              {this.state.zones.length ? 'Hide Zones' : 'Display Zones'}
            </button>
          </section>
          <section className='device-card-input-section'>
            <label
              htmlFor='duration'
              className='duration-label'>
              Runtime Duration:
            </label>
            <input
              type='number'
              id='duration'
              className='duration-input'
              placeholder='Desired Runtime'
              value={this.state.duration}
              name='duration'
              onChange={(event) => this.handleChange(event)}>
            </input>
            <button
              className='activate-buttons activate-all-button buttons'
              onClick={() => this.activateAllZones(device.zones)}>
              Start All Zones
            </button>
          </section>
        </div>
        <div>
          <ZoneContainer 
            zones={this.state.zones} 
          />
        </div>
      </div>
    );
  }
}
