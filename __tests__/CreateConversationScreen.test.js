import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import CreateConversationScreen from '../src/screens/CreateConversationScreen'

describe('<CreateConversationScreen />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<CreateConversationScreen />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<CreateConversationScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});