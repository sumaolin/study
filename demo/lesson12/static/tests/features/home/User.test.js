import React from 'react';
import { shallow } from 'enzyme';
import { User } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<User />);
  expect(renderedComponent.find('.home-user').length).toBe(1);
});
