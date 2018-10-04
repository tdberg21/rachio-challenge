import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Device from './Device.js';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('Device tests', () => {
  let wrapper;
  let mockDevice = {
    id:'d8f8ac47',
    model: 'GENERATION2_8ZONE',
    name: 'Gouda',
    on: true,
    timeZone: 'America/Los_Angeles',
    zones: [{id: 1}, {id: 2}]
  };

  beforeEach(() => {
    wrapper = shallow(<Device device={mockDevice}/>);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should clear the zones array in state when handleDisplayZones is called and there are zones in state', () => {
    const mockZones = [{ id: 1}, { id: 2}];
    wrapper = shallow(<Device device={mockDevice} />);
    wrapper.setState({zones: mockZones});
    wrapper.instance().handleDisplayZones();
    const results = wrapper.state('zones');

    expect(results).toEqual([]);
  });

  it('should add the zones to state when handleDisplayZones is called and there are no zones in state', () => {
    const mockZones = [{
      id: 1,
      name: 'taco',
      zoneNumber: 2,
      enabled: true,
      lastWateredDate: '06212018',
      maxRuntime: 10800,
      imageUrl: 'google.com'
    }, {
      id: 2,
      name: 'taco2',
      zoneNumber: 3,
      enabled: true,
      lastWateredDate: '06212018',
      maxRuntime: 10800,
      imageUrl: 'google.com'
    }];
    wrapper = shallow(<Device device={mockDevice} />);
    wrapper.setState({ zones: [] });
    wrapper.instance().handleDisplayZones(mockZones);
    const results = wrapper.state('zones').length;

    expect(results).toEqual(2);
  });

  it('should update state when handleChange is called', () => {
    const mockEvent = { target: { name: 'duration', value: 60 } };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('duration')).toBe(60);
  });

  it('should invoke handleChange when runtime duration is changed', () => {
    wrapper = shallow(<Device device={mockDevice} />);
    const spy = spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().forceUpdate();
    const mockEvent = { target: { value: 'something' } };

    wrapper.find('.duration-input').simulate('change', mockEvent);

    expect(spy).toHaveBeenCalled();
  });

  it('should invoke handleDisplayZones on click of the display zones button', () => {
    const mockZones = [{ id: 1 }, { id: 2 }];
    wrapper = shallow(<Device device={mockDevice} />);
    wrapper.setState({ zones: mockZones });
    const spy = spyOn(wrapper.instance(), 'handleDisplayZones');
    wrapper.instance().forceUpdate();

    wrapper.find('.display-zones-button').simulate('click', );

    expect(spy).toHaveBeenCalled();
  });
});