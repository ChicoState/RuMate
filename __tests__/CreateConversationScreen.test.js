import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import CreateConversationScreen from '../src/screens/CreateConversationScreen'

describe('<CreateConversationScreen />', () => {
  it('has 3 children', () => {
    <App />
    const tree = renderer.create(<CreateConversationScreen />).toJSON()
    expect(tree.children.length).toBe(3)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<CreateConversationScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});