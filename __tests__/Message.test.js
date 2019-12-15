import React from 'react';
import renderer from 'react-test-renderer';

import Message from '../src/components/Message';

describe('<Message />', () => {

  it('has 1 child', () => {
    const tree = renderer.create(<Message />).toJSON();
    console.log(tree.children.length)
    expect(tree.children.length).toBe(2);
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<Message />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});

