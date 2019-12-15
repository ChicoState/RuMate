import React from 'react';
import renderer from 'react-test-renderer';
import firebase from 'firebase';
import { shallow, configure } from 'enzyme';
import Tile from '../src/components/Tile';
import Adapter from 'enzyme-adapter-react-16';

const firebaseConfig = {
  apiKey: "AIzaSyA_ZWMR-MFG_ZHNK4_WuEeHoLP9vzsY_Vk",
  authDomain: "rumate-faaeb.firebaseapp.com",
  databaseURL: "https://rumate-faaeb.firebaseio.com",
  projectId: "rumate-faaeb",
  storageBucket: "",
  messagingSenderId: "484837108351",
  appId: "1:484837108351:web:53a875e9546d00aa2dad4a"
};

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

