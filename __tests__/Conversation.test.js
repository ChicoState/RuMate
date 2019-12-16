import React from 'react';
import renderer from 'react-test-renderer';
import Conversation from '../src/components/Conversation';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { Alert } from 'react-native';

jest.mock('Alert', () => {
  return {
    alert : jest.fn()
  }
})

describe('<Conversation />', () => {

  it('has 1 child', () => {
    const tree = renderer.create(<Conversation />).toJSON();
    console.log(tree.children.length)
    expect(tree.children.length).toBe(1);
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<Conversation />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  configure({ adapter: new Adapter() });

  it('test onPress', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(<Conversation navigation={navigation}/>);
    console.log(wrapper.props().onPress());
  })
  
  it('test onLongPress', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(<Conversation navigation={navigation}/>);
    console.log(wrapper.props().onLongPress());
  })
});

