import React from 'react';

export const languages = {
  ES: {
    search: 'Busca un libro',
    similar: 'Buscar parecido',
    searching: 'Buscando',
    searchError: 'No hemos encontrado nada con'
  },
  EN: {
    search: 'Search a book',
    similar: 'Search similar',
    searching: 'Searching',
    searchError: 'We could not find anything by'
  },
};

const LanguageContext = React.createContext({
  selected: 'ES',
  keys: Object.keys(languages),
  language: languages.ES,
  toggleLanguage: () => {}
});
export const LanguageProvider = LanguageContext.Provider;
export const LanguageConsumer = LanguageContext.Consumer;