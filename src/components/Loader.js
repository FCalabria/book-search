import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons'

function Loader(props) {
  return (
    <div className="my-auto mx-3 text-center flex flex-col items-center">
      <div className="text-lg font-light">{props.error ? 'No hemos encontrado nada con' : 'Buscando'} {props.searchTerm}</div>
      {
        props.error
          ? <div className="text-pink-500 mt-3"><FontAwesomeIcon icon={faHeartBroken} size="4x"/></div>
          : <div className="lds-heart"><div></div></div>
      }
  </div>
  )
}

export default Loader