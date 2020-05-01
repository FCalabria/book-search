import React from 'react';
import { render } from '../utils/test-utils';
import SearchBar from './SearchBar';

describe('Search bar', () => {
  test('should render correctly', () => {
    const { container } = render(<SearchBar />);
    expect(container.firstChild).toMatchSnapshot();
  });
})
