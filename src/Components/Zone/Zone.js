import React, { Component } from 'react';

export default class Zone extends Component {
  constructor() {
    super();

  }

  render() {
    let { zone } = this.props;
    return (
      <div>
        <h4>{zone.name}</h4>
        <img src={zone.imageUrl} alt={zone.name}/>
        <p>Max Runtime: {zone.maxRuntime} </p>
        <button>Activate Zone</button>
      </div>
    )
  }
}