import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import HomeScreen from '../src/screens/HomeScreen'

describe('<HomeScreen />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<HomeScreen />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<HomeScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});