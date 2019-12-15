import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import MessageList from '../src/components/MessageList'

describe('<MessageList />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<MessageList />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<MessageList />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});