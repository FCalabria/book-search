import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function SearchBar(props) {
  return (
    <div>
      <form className="py-2 px-4 rounded-full bg-white shadow-lg">
        <input type="text" placeholder="Busca un libro" className="bg-transparent"></input>
        <button type="submit" aria-label="Buscar" className="text-pink-700">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  )
}

export default SearchBar