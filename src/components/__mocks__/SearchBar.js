import React from 'react'
export default (props) => {
  return <form name="mockedForm" onSubmit={props.onSearch}>
    <input onChange={e => props.onChangeSearch(e.target.value)} type="text"></input>
  </form>;
}