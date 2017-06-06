var React = require('react');
import { shallow, mount, render } from 'enzyme';
import App from '../src/App';

describe('App', function() {
  it('renders', function() {
    expect(shallow(<App />).contains(<div className="App" />)).toBe(true);
  });
});