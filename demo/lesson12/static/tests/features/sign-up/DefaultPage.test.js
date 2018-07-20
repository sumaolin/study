import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/sign-up/DefaultPage';

describe('sign-up/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      signUp: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.sign-up-default-page').length
    ).toBe(1);
  });
});
