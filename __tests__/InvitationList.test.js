import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import firebase from 'firebase'
import Adapter from 'enzyme-adapter-react-16';

import InvitationList from '../src/components/InvitationList';

configure({ adapter: new Adapter() });

describe('<InvitationList />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<InvitationList />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});