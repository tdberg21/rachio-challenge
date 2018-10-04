import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import App from './App.js';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('App tests', () => {
  it('should return true', () => {
    expect(true).toEqual(true);
  });
});