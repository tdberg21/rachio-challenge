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
    const spy = spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().forceUpdate();
    const mockEvent = { target: { value: 'something' } };

    wrapper.find('.duration-input').simulate('change', mockEvent);

    expect(spy).toHaveBeenCalled();
  });

  it('should invoke activateZone once for each zone when activateAllZones is invoked', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({})
    }));
    const mockZones = [{id: 1}, {id: 2}];
    const spy = spyOn(wrapper.instance(), 'activateZone');
    wrapper.instance().forceUpdate();
    wrapper.instance().activateAllZones(mockZones);

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should add a status code to the status array in state when activateZone is invoked', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 204
    }));
    const initialState = wrapper.state('status').length;
    wrapper.instance().activateZone(3);
    const results = wrapper.state();

    expect(initialState).toEqual(0);
  });

  it('should invoke activateAllZones on click of the Start All Zones button', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({})
    }));
    const mockZones = [{ id: 1 }, { id: 2 }];
    wrapper.setState({ zones: mockZones });
    const spy = spyOn(wrapper.instance(), 'activateAllZones');
    wrapper.instance().forceUpdate();

    wrapper.find('.activate-all-button').simulate('click', mockZones);

    expect(spy).toHaveBeenCalled();
  });

  it('should invoke handleDisplayZones on click of the display zones button', () => {
    const mockZones = [{ id: 1 }, { id: 2 }];
    wrapper.setState({ zones: mockZones });
    const spy = spyOn(wrapper.instance(), 'handleDisplayZones');
    wrapper.instance().forceUpdate();

    wrapper.find('.display-zones-button').simulate('click', );

    expect(spy).toHaveBeenCalled();
  });
});