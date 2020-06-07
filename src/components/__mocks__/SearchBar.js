import React from 'react'
export default (props) => {
return <div>
  <form onSubmit={props.onSearch}>
    <input onChange={props.onChangeSearch}></input>
    <button type="submit"></button>
  </form>
</div>;
}