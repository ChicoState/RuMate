import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import BillsScreen from '../src/screens/BillsScreen'

describe('<BillsScreen />', () => {
  it('has 2 child', () => {
    <App />
    const tree = renderer.create(<BillsScreen />).toJSON()
    expect(tree.children.length).toBe(2)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<BillsScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});