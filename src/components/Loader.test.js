import React from 'react';
import { render } from '../../tests/test-utils';
import Loader from './Loader';

describe('Loader', () => {
  const defaultProps = {
    searchTerm: 'Some book'
  }
  let baseContainer
  beforeEach(() => {
    baseContainer = render(<Loader {...defaultProps} />).container;
  })
  test('should render correctly when there is no error', () => {
    expect(baseContainer.firstChild).toMatchSnapshot();
  });
  test('should render correctly when error exists', () => {
    const { container } = render(<Loader {...defaultProps} error={true}/>);
    expect(baseContainer.firstChild).toMatchDiffSnapshot(container.firstChild);
  })
})
