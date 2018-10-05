import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import App from './App.js';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('App tests', () => {
  let wrapper;
  const mockDevices = [{
    id: "82667e2",
    model: "GENERATION38",
    name: "Pepper Jack",
    on: true,
    status: "ONLINE",
    timeZone: "America",
    zones: [{ id: 1 }, { id: 2 }]
  }, 
  {
    id: "82667e3",
    model: "GENERATION48",
    name: "Colby Jack",
    on: true,
    status: "OFFLINE",
    timeZone: "America",
    zones: [{ id: 3 }, { id: 4 }]
  }];

  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({
      devices: mockDevices,
      id: "2ee8a23423",
      fullName: "proddy test"
    })
  }));

  it('should match the snapshot', () => {
    wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state with a clean user object when scrubUserInfo is invoked', () => {
    let mockUser = {
      devices: mockDevices,
      id: "2ee8a23423",
      fullName: "proddy test"
    };
    wrapper = shallow(<App />, { disableLifecycleMethods: true });
    wrapper.instance().scrubUserInfo(mockUser);
    const results = wrapper.state('user');

    expect(results).toEqual({
      devices: mockDevices,
      id: "2ee8a23423",
      name: "proddy test"
    });
  });
});



  