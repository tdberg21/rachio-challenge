import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import ZoneContainer from './ZoneContainer.js';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('ZoneContainer tests', () => {
  it('should match the snapshot with no zones', () => {
    const wrapper = shallow(<ZoneContainer zones={[]}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with zones', () => {
    const mockZones = [{id: 1}, {id: 2}];
    const wrapper = shallow(<ZoneContainer zones={mockZones} />);
    expect(wrapper).toMatchSnapshot();
  });
});