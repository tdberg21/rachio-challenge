import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import DeviceContainer from './DeviceContainer.js';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('DeviceContainer tests', () => {

  it('matches the snapshot without devices', () => {
    const wrapper = shallow(<DeviceContainer />);
    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with devices', () => {
    let mockDevices = [{ id: 1 }, { id: 2 }];
    const wrapper = shallow(<DeviceContainer devices={mockDevices} />);
    expect(wrapper).toMatchSnapshot();
  });
});