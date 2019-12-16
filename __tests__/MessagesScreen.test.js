import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import firebase from 'firebase';
import firebaseConfig from '../config/Firebase.config';
import MessagesScreen from '../src/screens/MessagesScreen'


configure({ adapter: new Adapter() });
firebase.initializeApp(firebaseConfig);

describe('<MessagesScreen />', () => {
  
  it('has 2 children', () => {
    const navigation = { navigation: jest.fn() };
    const tree = renderer.create(
      <MessagesScreen navigation={navigation}/>
    ).toJSON()
    expect(tree.children.length).toBe(2)
  });
  
  it('renders correctly', () => {
    const navigation = { navigation: jest.fn() };
    const tree = renderer.create(
      <MessagesScreen navigation={navigation}/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  });
});