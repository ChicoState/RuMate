import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import InvitationsScreen from '../src/screens/InvitationsScreen'

describe('<InvitationsScreen />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<InvitationsScreen />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<InvitationsScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});