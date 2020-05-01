import React, {useState} from 'react';
import {LanguageConsumer} from '../language-context'

function BookDetail(props) {
  const [imageId, setImageId] = useState(props.isbn[0])
  const [imageIdIndex, setImageIdIndex] = useState(0)

  function onImageError() {
    const newIndex = imageIdIndex + 1
    if (props.isbn[newIndex]) {
      setImageId(props.isbn[newIndex])
      setImageIdIndex(newIndex)
    } else {
      setImageId('')
    }
  }
    return (
    <LanguageConsumer>
    {language => (
        <div className="flex flex-wrap md:flex-no-wrap px-3 py-4 odd:bg-teal-300">
          <div className="w-20 sm:w-32 lg:w-40 mr-2 flex-grow-0 flex-shrink-0 bg-pink-200">
            <img
              src={imageId
                ? `http://covers.openlibrary.org/b/isbn/${imageId}-M.jpg?default=false`
                : 'https://dummyimage.com/130x170/fed7e2/fed7e2.png'
              }
              alt=""
              onError={onImageError}/>
          </div>
          <div className="flex flex-1 flex-wrap content-center mr-2">
            <span className="w-full text-xl font-medium">{props.title}</span>
            <span className="italic text-gray-700">{props.author}</span>
            <span className="text-gray-700">&nbsp;-&nbsp;{props.year}</span>
          </div>
          {
            props.hasSubject &&
            <button className="self-center w-full md:w-auto flex-none p-2 mt-3 md:mt-0 ml-auto shadow-lg rounded-lg border-2 border-pink-700 text-pink-700 hover:bg-teal-100 active:bg-teal-100 focus:bg-teal-100" onClick={props.onSearchSimilar}>{language.similar}</button>
          }
      </div>
      )}
    </LanguageConsumer>
    )
}

export default BookDetail