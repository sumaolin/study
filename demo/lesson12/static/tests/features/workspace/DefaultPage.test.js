import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/workspace/DefaultPage';

describe('workspace/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      workspace: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.workspace-default-page').length
    ).toBe(1);
  });
});
