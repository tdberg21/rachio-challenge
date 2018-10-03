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
        <div className='device-card-text-section'>
          <h3 className='device-card-text'>{device.name}</h3>
          <p className='device-card-text'>Model: {device.model}</p>
          <p className='device-card-text'>Status: {device.status}</p>
          <p className='device-card-text'>Zones: {device.zones.length}</p>
        </div>
        <div className='device-card-input-section'>
          <label htmlFor='duration'>Runtime Duration:</label>
          <input
            type='number'
            id='duration'
            className='duration-input'
            placeholder='Desired Runtime'
            value={this.state.duration}
            name='duration' 
            onChange={(event) => this.handleChange(event)}>
          </input>
          <button className='activate-buttons'>Start All Zones</button>
          <button
            onClick={() => this.handleDisplayZones(device.zones)}
            className='activate-buttons display-zones-button'
            value={device.id} >
            {this.state.zones.length ? 'Hide Zones' : 'Display Zones'}
          </button>
        </div>
        <div>
          <ZoneContainer zones={this.state.zones} duration={this.state.duration}/>
        </div>
      </div>
    );
  }
}