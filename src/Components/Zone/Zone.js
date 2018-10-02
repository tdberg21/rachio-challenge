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
    const { runtime } = this.props;
    const url = 'https://api.rach.io/1/public/zone/start';
    // fetch(url, {
    //   method: 'PUT',
    //   body: {
    //     id,
    //     runtime
    //   },
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${apiKey}`
    //   }
    // })
    //   .then(response => response.json())
    //   .then(results => console.log(results));
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