import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import ConversationScreen from '../src/screens/ConversationScreen'

describe('<ConversationScreen />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<ConversationScreen />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<ConversationScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});