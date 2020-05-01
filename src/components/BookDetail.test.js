import React from 'react';
import { render } from '../utils/test-utils';
import BookDetail from './BookDetail';

describe('BookDetail', () => {
  const defaultProps = {
    isbn: ['fake-isbn'],
    title: 'book title',
    author: 'someone',
    year: '1999'
  }
  let baseContainer
  beforeEach(() => {
    baseContainer = render(<BookDetail {...defaultProps} />).container;
  })
  test('should render correctly when there is no error', () => {
    expect(baseContainer.firstChild).toMatchSnapshot();
  });
  test('should render the "similar" button when it has a subjet', () => {
    const { container } = render(<BookDetail {...defaultProps} hasSubject={true} />);
    expect(baseContainer.firstChild).toMatchDiffSnapshot(container.firstChild);
  })
})
