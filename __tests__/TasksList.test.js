import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import TasksList from '../src/components/TaskList'

describe('<TasksList />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<TasksList />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<TasksList />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});