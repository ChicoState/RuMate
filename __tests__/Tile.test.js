import React from 'react';
import renderer from 'react-test-renderer';

import Tile from '../src/components/Tile';

describe('<Tile />', () => {

  it('has 1 child', () => {
    const tree = renderer.create(<Tile />).toJSON();
    console.log(tree.children.length)
    expect(tree.children.length).toBe(1);
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<Tile />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});

