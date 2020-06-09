import React from 'react'
export default (props) => {
  return <div>
    {props.author}
    <button onClick={props.onSearchSimilar}>similar button mock</button>
  </div>;
}