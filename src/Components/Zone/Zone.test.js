import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Zone from './Zone.js';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('Zone tests', () => {
  let wrapper;
  let mockZone = {
    enabled: false,
    id: "bf329221",
    imageUrl: "google.com",
    lastWateredDate: 1535642590000,
    maxRuntime: 10800,
    name: "Zone 2",
    zoneNumber: 2
  };

  beforeEach(() => {
    wrapper = shallow(<Zone zone={mockZone} duration={60} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should make a fetch request when handleActivateZone is called', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({})
    }));
    const mockEvent = { target: {value: 2} };
    wrapper.instance().handleActivateZone(mockEvent);

    expect(window.fetch).toHaveBeenCalled();
  });

  it('should update state with a message of success when handleActivateZone is called', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({})
    }));
    const mockEvent = { target: { value: 2 } };
    wrapper.instance().handleActivateZone(mockEvent);
    const results = wrapper.state('message');
    
    expect(results).toEqual('');
  });

  it('should invoke handleActivateZone when activate zone button is clicked', () => {
    const spy = spyOn(wrapper.instance(), 'handleActivateZone');
    const mockEvent = { target: { value: 2 } };
    wrapper.instance().forceUpdate();

    wrapper.find('.activate-zone-button').simulate('click', mockEvent);

    expect(spy).toHaveBeenCalled();
  });
});

