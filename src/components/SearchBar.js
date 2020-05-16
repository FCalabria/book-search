import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {LanguageConsumer} from '../language-context'

function SearchBar(props) {
  function handleChange(e) {
    const value = e.target.value.trim()
    props.onChangeSearch(value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    props.onSearch()
  }

  return (
    <LanguageConsumer>
      {({language}) => (
        <div>
          <form aria-label="Formulario de busqueda" className="py-2 px-4 rounded-full bg-white shadow-lg" onSubmit={handleSubmit}>
            <input
              type="text"
              value={props.term}
              onChange={handleChange}
              aria-label={language.search}
              placeholder={language.search}
              className="bg-transparent"></input>
            <button type="submit" aria-label="Buscar" className="text-pink-700">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
      )}
    </LanguageConsumer>
  )
}

export default SearchBar