import React from 'react';
import renderer from 'react-test-renderer';
import AddRoommateScreen from '../src/screens/AddRoomateScreen'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from 'react-native-elements';

configure({ adapter: new Adapter() });

describe('<AddRoommateScreen />', () => {
  it('has 2 children', () => {
    const navigation = { navigate: jest.fn() };
    const tree = renderer.create(<AddRoommateScreen navigation={navigation}/>).toJSON()
    expect(tree.children.length).toBe(2)
  });
  
  it('renders correctly', () => {
    const navigation = { navigate: jest.fn() };
    const tree = renderer.create(<AddRoommateScreen navigation={navigation}/>).toJSON()
    expect(tree).toMatchSnapshot()
  });
})