import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import TasksScreen from '../src/screens/TasksScreen'

describe('<TasksScreen />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<TasksScreen />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<TasksScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});