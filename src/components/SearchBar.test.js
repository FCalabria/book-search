import React from 'react';
import { render, fireEvent } from '../../tests/test-utils';
import SearchBar from './SearchBar';

describe('Search bar', () => {
  const onChangeSearch = jest.fn()
  beforeEach(() => {
    onChangeSearch.mockClear()
  })
  test('should render correctly', () => {
    const { container } = render(<SearchBar />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should call onChangeSearch with the input value on changes', () => {
    const { getByRole } = render(<SearchBar onChangeSearch={onChangeSearch}/>);
    const input = getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new value' }})
    expect(onChangeSearch).toHaveBeenCalledTimes(1)
    expect(onChangeSearch).toHaveBeenCalledWith('new value')
  })
  test('should remove excess whitespace when calling onChangeSearch', () => {
    const { getByRole } = render(<SearchBar onChangeSearch={onChangeSearch}/>);
    const input = getByRole('textbox')
    fireEvent.change(input, { target: { value: '   new value   ' }})
    expect(onChangeSearch).toHaveBeenCalledTimes(1)
    expect(onChangeSearch).toHaveBeenCalledWith('new value')
  })
  test('should call onSearch when form is submited', () => {
    const onSearch = jest.fn()

    const { getByRole } = render(<SearchBar onSearch={onSearch} onChangeSearch={onChangeSearch}/>);
    const input = getByRole('textbox')
    const submit = getByRole('button', {name: /buscar/i})
    fireEvent.change(input, { target: { value: 'new value' }})
    fireEvent.click(submit)
    expect(onSearch).toHaveBeenCalledTimes(1)
  })
})
