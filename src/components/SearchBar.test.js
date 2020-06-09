import React from 'react';
import SearchBar from './SearchBar';
import {render, fireEvent} from '../../tests/test-utils'

describe('SearchBar', () => {
  const onChangeSearch = jest.fn()
  const onSearch = jest.fn()
  let input, submitButton, form
  beforeEach(() => {
    onChangeSearch.mockClear()
    onSearch.mockClear()

    const {getByRole} = render(<SearchBar onChangeSearch={onChangeSearch} onSearch={onSearch}></SearchBar>)
    input = getByRole('textbox')
    submitButton = getByRole('button')
    form = getByRole('form')
  })
  test('should call onChangeSearch when the input changes', () => {
    fireEvent.change(input, {target: {value: 'new value'}})
    expect(onChangeSearch).toHaveBeenCalled()
  })
  test('should call onChangeSearch with the trimmed input value', () => {
    fireEvent.change(input, {target: {value: '     new value      '}})
    expect(onChangeSearch).toHaveBeenCalledTimes(1)
    expect(onChangeSearch).toHaveBeenCalledWith('new value')
  })
  test('should call onSearch when submit button is clicked', () => {
    fireEvent.click(submitButton)
    expect(onSearch).toHaveBeenCalled()
  })
  test('should call onSearch when the form is submitted', () => {
    fireEvent.submit(form)
    expect(onSearch).toHaveBeenCalled()
  })
})