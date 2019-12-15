import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import AccountScreen from '../src/screens/AccountScreen'

describe('<AccountScreen />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<AccountScreen />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<AccountScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});