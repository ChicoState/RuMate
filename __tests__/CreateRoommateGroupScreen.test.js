import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import CreateRoommateGroupScreen from '../src/screens/CreateRoommateGroupScreen'

describe('<CreateRoommateGroupScreen />', () => {
  it('has 5 child', () => {
    <App />
    const tree = renderer.create(<CreateRoommateGroupScreen />).toJSON()
    expect(tree.children.length).toBe(5)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<CreateRoommateGroupScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});