import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import MessagesScreen from '../src/screens/MessagesScreen'

describe('<MessagesScreen />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<MessagesScreen />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<MessagesScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});