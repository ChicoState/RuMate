import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import firebase from 'firebase';
import Calendar from '../src/components/Calendar';

describe('<Calendar />', () => {
  it('has 1 child', () => {
    <App />
    if (!firebase.auth().currentUser)
      firebase.auth().signInWithEmailAndPassword("messanger1@noyou.com", "password")
    const tree = renderer.create(<Calendar />).toJSON();
    console.log(tree.children.length)
    expect(tree.children.length).toBe(1);
  });
  
  it('renders correctly', () => {
    <App />
    if (!firebase.auth().currentUser)
      firebase.auth().signInWithEmailAndPassword("messanger1@noyou.com", "password")
    const tree = renderer.create(<Calendar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});

