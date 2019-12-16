import React from 'react';
import renderer from 'react-test-renderer';
import ChangeDetailScreen from '../src/screens/ChangeDetailsScreen'

describe('<ChangeDetailScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<ChangeDetailScreen />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<ChangeDetailScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});