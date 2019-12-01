import React from 'react';
import renderer from 'react-test-renderer';
import firebase from 'firebase'
import App from './App'
import InvitationList from './src/components/InvitationList';

describe('<InvitationList />', () => {
  it('has 1 child', () => {
    <App />
    if (!firebase.auth().currentUser)
      firebase.auth().signInWithEmailAndPassword("messanger1@noyou.com", "password")
    const tree = renderer.create(<InvitationList />).toJSON()
    console.log(tree.children.length)
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<InvitationList />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});