import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Tile from '../src/components/Tile';
import Adapter from 'enzyme-adapter-react-16';

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
  
  // configure({ adapter: new Adapter() });

  // test('test onPress functionality', () => {
  //   const onPressEvent = jest.fn();
  //   onPressEvent.mockReturnValue('Link on press invoked');
  //   const wrapper = shallow(
  //     <Tile 
  //       onPress={onPressEvent}
  //       text='Tile Component'
  //     />);
  //   wrapper.find(Text).first().props().onPress();
  //   expect(onPressEvent.mock.calls.length).toBe(1);
  // });

  // it('renders correctly', () => {
  //   const tree = renderer.create(
  //   <Tile
  //     run="logout"
  //   />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders correctly', () => {
  //   const tree = renderer.create(
  //   <Tile 
  //     run="haptic-select"
  //   />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });


});

