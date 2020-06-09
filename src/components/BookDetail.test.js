import React from 'react';
import BookDetail from './BookDetail';
import {render} from '../../tests/test-utils'

describe('BookDetail', () => {
  const defaultProps = {
    isbn: ['fake-isbn'],
    title: 'book title',
    author: 'someone',
    year: '1999'
  }
  let firstChild
  beforeEach(() => {
    const renderOutput = render(<BookDetail {...defaultProps} ></BookDetail>)
    firstChild = renderOutput.container.firstChild
  })
  test.skip('should render correctly when there is no error', () => {
        expect(firstChild).toMatchSnapshot()
  })
  test('should render the "similar" button when there is a subject', () => {
    const renderOutput = render(<BookDetail {...defaultProps} hasSubject={true} ></BookDetail>)
    const firstChildWithButton = renderOutput.container.firstChild

    expect(firstChild).toMatchDiffSnapshot(firstChildWithButton)
  })
})