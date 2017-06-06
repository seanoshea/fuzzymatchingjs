var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var MemberList = require('../App.js');
 
describe('App', () => {
  it('renders', () => {
    var element = TestUtils.renderIntoDocument(<App />);
    expect(element).toBeTruthy();
  });
});