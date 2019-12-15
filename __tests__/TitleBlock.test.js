import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App'
import TitleBlock from '../src/components/TitleBlock'

describe('<TitleBlock />', () => {
  it('has 1 child', () => {
    <App />
    const tree = renderer.create(<TitleBlock />).toJSON()
    expect(tree.children.length).toBe(1)
  });
  
  it('renders correctly', () => {
    const tree = renderer.create(<TitleBlock />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});