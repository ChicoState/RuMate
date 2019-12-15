import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import AccountScreen from '../src/screens/AccountScreen'

describe('<AccountScreen />', () => {
  it('has 2 children', () => {
    <App />
    const tree = renderer.create(<AccountScreen />).toJSON()
    expect(tree.children.length).toBe(2)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<AccountScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});