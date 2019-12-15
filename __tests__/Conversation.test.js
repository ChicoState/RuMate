import React from 'react';
import renderer from 'react-test-renderer';

import Conversation from '../src/components/Conversation';

describe('<App />', () => {

  it('has 1 child', () => {
    const tree = renderer.create(<Conversation />).toJSON();
    console.log(tree.children.length)
    expect(tree.children.length).toBe(1);
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<Conversation />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});

