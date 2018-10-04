import React from 'react';
import Zone from '../Zone/Zone.js';
import PropTypes from 'prop-types';

const ZoneContainer = ({ zones, duration }) => {
  let zonesToDisplay;
  if (zones.length) {
    zonesToDisplay = zones.map((zone, index) => {
      return <Zone zone={zone} key={index} duration={duration}/>;
    });
  }
  return (
    <div>
      {zonesToDisplay}
    </div>
  );
};

export default ZoneContainer;

ZoneContainer.propTypes = {
  zones: PropTypes.array,
  duration: PropTypes.number
};