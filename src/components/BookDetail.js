import React from 'react';

function BookDetail(props) {
  // https://openlibrary.org/images/icons/avatar_book-sm.png
  return (
    <div className="flex py-3 my-3 px-3 odd:bg-teal-300">
      <div className="w-1/3 mr-2 flex-grow-0 flex-shrink-0 bg-pink-200">
        <img
          src={`http://covers.openlibrary.org/b/isbn/${props.isbn}-M.jpg`}
          alt=""/>
      </div>
      <div className="flex flex-wrap content-center">
        <span className="w-full text-xl font-medium">{props.title}</span>
        <span className="italic text-gray-700">{props.author}</span>
        <span className="text-gray-700">&nbsp;-&nbsp;{props.year}</span>
      </div>
      <button>Search similar</button>
  </div>
  )
}

export default BookDetail