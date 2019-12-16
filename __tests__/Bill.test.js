import React from 'react';
import renderer from 'react-test-renderer';

import Bill from '../src/components/Bill';

describe('<Bill />', () => {

  it('has 1 child', () => {
    const tree = renderer.create(<Bill />).toJSON();
    console.log(tree.children.length)
    expect(tree.children.length).toBe(2);
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<Bill />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('checks payed', () => {
    const tree = renderer.create(
      <Bill payed={true}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it ('checks editing', () => {
    const tree = renderer.create(
      <Bill edit={true} />
    ).toJSON();
  })
  
});

