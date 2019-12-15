import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import CreateTaskScreen from '../src/screens/CreateTaskScreen'

describe('<CreateTaskScreen />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<CreateTaskScreen />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<CreateTaskScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});