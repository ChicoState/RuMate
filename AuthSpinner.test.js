import React from 'react';
import renderer from 'react-test-renderer';

import AuthSpinner from './src/components/AuthSpinner';

describe('<AuthSpinner />', () => {

  it('has 1 child', () => {
    const tree = renderer.create(<AuthSpinner />).toJSON();
    console.log(tree.children.length)
    expect(tree.children.length).toBe(3);
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<AuthSpinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});

