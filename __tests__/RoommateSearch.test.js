import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import RoommateSearch from '../src/components/RoommateSearch'

describe('<RoommateSearch />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<RoommateSearch />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<RoommateSearch />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});