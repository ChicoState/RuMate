import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Message from '../src/components/Message';

configure({ adapter: new Adapter() });

describe('<Message />', () => {

  it('has 2 children', () => {
    const navigation = {navigation: jest.fn()};
    const tree = renderer.create(<Message navigation={navigation}/>).toJSON();
    console.log(tree.children.length)
    expect(tree.children.length).toBe(2);
  });
  
  it('renders correctly', () => {
    const navigation = {navigation: jest.fn()};
    const tree = renderer.create(<Message navigation={navigation}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});

