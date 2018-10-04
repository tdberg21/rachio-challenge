import React, { Component } from 'react';
import { apiKey } from '../../helpers/apiKey.js';
import './Zone.css';
import PropTypes from 'prop-types';

export default class Zone extends Component {
  constructor() {
    super();

    this.state = {
      message: '',
      duration: 0
    };

    this.handleActivateZone = this.handleActivateZone.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let duration = event.target.value;
    this.setState({
      duration
    });
  }

  handleActivateZone(event) {
    const id = event.target.value;
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
      .then(() => this.setState({message: 'Success!'}))
      .catch(error => this.setState({message: `Error: ${error}`}));
  }

  render() {
    let { zone } = this.props;
    return (
      <div>
        <h4>{zone.name}</h4>
        <img src={zone.imageUrl} alt={zone.name} className='zone-image'/>
        <p>Max Runtime: {zone.maxRuntime} </p>
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
        <button 
          onClick={(event) => this.handleActivateZone(event)} 
          className='activate-zone-button'
          value={zone.id}>
          Activate Zone
        </button>
        {this.state.message}
      </div>
    );
  }
}

Zone.propTypes = {
  // zone: PropTypes.obj,
  duration: PropTypes.number
};