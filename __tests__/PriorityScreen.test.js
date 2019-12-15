import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import PriorityScreen from '../src/screens/PriorityScreen'

describe('<PriorityScreen />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<PriorityScreen />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<PriorityScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});