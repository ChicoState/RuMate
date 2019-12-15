import React from 'react';
import renderer from 'react-test-renderer';
import firebase from 'firebase'
import App from '../App'
import Register from '../src/components/Register';
import AuthScreen from '../src/screens/AuthScreen';



describe('<Register />', () => {
  <>
    <App />

  </>
  
  it('has 2 child', () => {
    const tree = renderer.create(<Register />).toJSON()
    console.log(tree.children.length)
    expect(tree.children.length).toBe(2)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<Register />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});