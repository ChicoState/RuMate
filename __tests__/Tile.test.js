import React from 'react';
import renderer from 'react-test-renderer';
import firebase from 'firebase';
import { shallow, configure } from 'enzyme';
import Tile from '../src/components/Tile';
import Adapter from 'enzyme-adapter-react-16';
import firebaseConfig from './Firebase.test.config';

describe('<Tile />', () => {

  it('has 1 child', () => {
    const tree = renderer.create(<Tile />).toJSON();
    console.log(tree.children.length);
    expect(tree.children.length).toBe(1);
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<Tile />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  configure({ adapter: new Adapter() });

  test('test onPress functionality', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(<Tile nav={navigation}/>);
    console.log(wrapper.props().onPress());
  });

  test('test onPress Haptic', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(<Tile run="haptic-select" nav={navigation}/>);
    console.log(wrapper.props().onPress());
  });
  
  test('test onPress logout', () => {
    firebase.initializeApp(firebaseConfig);
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(<Tile run="logout" nav={navigation}/>);
    console.log(wrapper.props().onPress());
  });

});

