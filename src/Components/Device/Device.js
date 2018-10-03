import React, { Component } from 'react';
import ZoneContainer from '../ZoneContainer/ZoneContainer.js';

export default class Device extends Component {
  constructor() {
    super();
    
    this.state = {
      zones: [],
      duration: 0
    };
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

  scrubZones(zone) {
    let { id, name, zoneNumber, enabled, lastWateredDate, maxRuntime, imageUrl } = zone;
    let zoneInfo = {
      id,
      name,
      zoneNumber,
      enabled,
      lastWateredDate,
      maxRuntime,
      imageUrl
    };
    return zoneInfo;
  }

  handleChange(event) {
    let duration = event.target.value;
    this.setState({
      duration
    });
  }

  render() {
    let { device } = this.props;
    return (
      <div className='device-card'>
        <h3>{device.name}</h3>
        <p>Model: {device.model}</p>
        <p>Status: {device.status}</p>
        <p>Zones: {device.zones.length}</p>
        <input 
          type='number' 
          placeholder='Desired Runtime' 
          value={this.state.duration} 
          name='duration' onChange={(event) => this.handleChange(event)}>
        </input>
        <button 
          onClick={() => this.handleDisplayZones(device.zones)} 
          value={device.id} >
          {this.state.zones.length ? 'Hide Zones' : 'Display Zones'}
        </button>
        <button>Start All Zones</button>
        <div>
          <ZoneContainer zones={this.state.zones} duration={this.state.duration}/>
        </div>
      </div>
    );
  }
}