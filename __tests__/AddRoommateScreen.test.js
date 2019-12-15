import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import AddRoommateScreen from '../src/screens/AddRoomateScreen'

describe('<AddRoommateScreen />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<AddRoommateScreen />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<AddRoommateScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});