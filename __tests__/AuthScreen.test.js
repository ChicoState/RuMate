import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import AuthScreen from '../src/screens/AuthScreen'

describe('<AuthScreen />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<AuthScreen />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<AuthScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});