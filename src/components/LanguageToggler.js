import React from 'react';
import {LanguageConsumer} from '../language-context';

function LanguageToggler() {
  const renderOptions = values => values.map(value => (
    <option value={value} key={value}>{value}</option>
  ))
  return (
    <LanguageConsumer>
      {({keys, selected, toggleLanguage}) => (<select
        className="absolute top-0 right-0 mt-3 mr-3 text-gray-700 bg-teal-100 border-pink-200 border-2 shadow-lg"
        defaultValue={selected}
        onChange={e => toggleLanguage(e.target.value)}
      >
        {renderOptions(keys)}
        </select>
      )}
    </LanguageConsumer>
    );
}

export default LanguageToggler;

