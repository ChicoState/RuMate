import React from 'react';
import renderer from 'react-test-renderer';

import BillList from '../src/components/BillList';

describe('<BillList />', () => {

  it('has 1 child', () => {
    const tree = renderer.create(<BillList />).toJSON();
    console.log(tree.children.length)
    expect(tree.children.length).toBe(1);
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<BillList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

