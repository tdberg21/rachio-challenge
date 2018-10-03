import React, { Component } from 'react';
import { apiKey } from '../../helpers/apiKey.js';

export default class Zone extends Component {
  constructor() {
    super();

    this.state = {
      runtime: ''
    };
  }

  handleActivateZone(event) {

    const id = event.target.value;
    console.log(id)
    const duration = parseInt(this.props.duration);
    console.log(duration)

    const url = 'https://api.rach.io/1/public/zone/start';
    fetch(url, {
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
      .then(response => response.text())
      .then(results => console.log(results));
  }

  render() {
    let { zone } = this.props;
    return (
      <div>
        <h4>{zone.name}</h4>
        <img src={zone.imageUrl} alt={zone.name}/>
        <p>Max Runtime: {zone.maxRuntime} </p>
        <button 
          onClick={(event) => this.handleActivateZone(event)} 
          value={zone.id}>
          Activate Zone
        </button>
      </div>
    );
  }
}