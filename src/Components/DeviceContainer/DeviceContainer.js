import React from 'react';
import Device from '../Device/Device.js';
import './DeviceContainer.css';

const DeviceContainer = (props) => {
  if (!props.devices) {
    return (
      <div className='device-container loading-container'>
        <p className='loading-text'>Loading...</p>
      </div>
    );
  } else {
    let devices = props.devices.map((device, index) => {
      return <Device device={device} key={index}/>;
    });
    return (
      <div className='device-container'>
        {devices}
      </div>
    );
  }
};

export default DeviceContainer;