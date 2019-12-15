import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import Register from '../src/components/Register'

describe('<Register />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<Register />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<Register />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});