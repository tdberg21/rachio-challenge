import React from 'react';
import Zone from '../Zone/Zone.js';

const ZoneContainer = ({ zones, runtime }) => {
  let zonesToDisplay;
  if (zones.length) {
    zonesToDisplay = zones.map((zone, index) => {
      return <Zone zone={zone} key={index} runtime={runtime}/>;
    });
  }
  return (
    <div>
      {zonesToDisplay}
    </div>
  );
};

export default ZoneContainer;