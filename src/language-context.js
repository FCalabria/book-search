import React from 'react';

export const languages = {
  es: {
    search: 'Busca un libro',
    similar: 'Buscar parecido',
    searching: 'Buscando',
    searchError: 'No hemos encontrado nada con'
  },
  en: {
    search: 'Search a book',
    similar: 'Search similar',
    searching: 'Searching',
    searchError: 'We could not find anything by'
  },
};

const LanguageContext = React.createContext(languages.es);
export const LanguageProvider = LanguageContext.Provider;
export const LanguageConsumer = LanguageContext.Consumer;