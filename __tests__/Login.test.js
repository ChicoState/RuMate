import React from 'react';
import renderer from 'react-test-renderer';
import firebase from 'firebase'
import App from '../App'
import Login from '../src/components/Login';

describe('<Login />', () => {
  <App />
  it('has 2 child', () => {
    const tree = renderer.create(<Login />).toJSON()
    console.log(tree.children.length)
    expect(tree.children.length).toBe(2)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<Login />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});