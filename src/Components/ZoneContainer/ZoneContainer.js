import React from 'react';
import Zone from '../Zone/Zone.js';

const ZoneContainer = ({ zones }) => {
  let zonesToDisplay;
  if (zones.length) {
    zonesToDisplay = zones.map((zone, index) => {
      return <Zone zone={zone} key={index} />;
    });
  }
  return (
    <div className='zone-container-component'>
      {zonesToDisplay}
    </div>
  );
};

export default ZoneContainer;
