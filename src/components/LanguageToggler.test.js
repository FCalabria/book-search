import React from 'react';
import { render } from '../utils/test-utils';
import LanguageToggler from './LanguageToggler';
import {languages} from '../language-context'


describe.only('LanguageToggler', () => {
  test('should render correctly', () => {
    const container = render(<LanguageToggler />).container
    expect(container.firstChild).toMatchSnapshot();
  });
})
