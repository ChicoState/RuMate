import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import CalendarScreen from '../src/screens/CalendarScreen'

describe('<CalendarScreen />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<CalendarScreen />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<CalendarScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});