import React from 'react';
import Device from '../Device/Device.js';
import './DeviceContainer.css';
import PropTypes from 'prop-types';

const DeviceContainer = ({ devices }) => {
  if (!devices) {
    return (
      <div className='device-container-component loading-container'>
        <p className='loading-text'>Loading...</p>
      </div>
    );
  } else {
    let devicesToDisplay = devices.map((device, index) => {
      return <Device device={device} key={index}/>;
    });
    return (
      <div className='device-container-component'>
        {devicesToDisplay}
      </div>
    );
  }
};

export default DeviceContainer;

DeviceContainer.propTypes = {
  devices: PropTypes.array
};