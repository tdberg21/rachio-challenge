import React from 'react';
import Device from '../Device/Device.js';

const DeviceContainer = (props) => {
  if (!props.devices) {
    return (
      <div>
      Loading
      </div>
    );
  } else {
    let devices = props.devices.map((device, index) => {
      return <Device device={device} key={index}/>;
    });
    return (
      <div>
        {devices}
      </div>
    );
  }
};

export default DeviceContainer;