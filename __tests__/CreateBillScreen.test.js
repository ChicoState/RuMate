import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import CreateBillScreen from '../src/screens/CreateBillScreen'

describe('<CreateBillScreen />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<CreateBillScreen />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<CreateBillScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});