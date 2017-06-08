import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../src/App';

describe('App', function() {
  it('renders', function() {
    expect(shallow(<App />).is('.App')).toBe(true);
    expect(mount(<App />).find('.App').length).toBe(1);
    expect(render(<App />).find('.App').length).toBe(1);
  });
});