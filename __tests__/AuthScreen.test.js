import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import AuthScreen from '../src/screens/AuthScreen'

describe('<AuthScreen />', () => {
  it('has 2 children', () => {
    <App />
    const tree = renderer.create(<AuthScreen />).toJSON()
    expect(tree.children.length).toBe(2)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<AuthScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});