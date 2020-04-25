import React from 'react';

class BookDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageId: props.isbn[0],
      imageIdIndex: 0
    }
    this.onImageError = this.onImageError.bind(this)
  }
  onImageError() {
    const newIndex = this.state.imageIdIndex + 1
    if (this.props.isbn[newIndex]) {
      this.setState({
        imageId: this.props.isbn[newIndex],
        imageIdIndex: newIndex
      })
    }
  }
  render() {
    return (
      <div className="flex flex-wrap md:flex-no-wrap px-3 py-4 odd:bg-teal-300">
        <div className="w-20 sm:w-32 lg:w-40 mr-2 flex-grow-0 flex-shrink-0 bg-pink-200">
          <img
            src={`http://covers.openlibrary.org/b/isbn/${this.state.imageId}-M.jpg?default=false`}
            alt=""
            onError={this.onImageError}/>
        </div>
        <div className="flex flex-1 flex-wrap content-center mr-2">
          <span className="w-full text-xl font-medium">{this.props.title}</span>
          <span className="italic text-gray-700">{this.props.author}</span>
          <span className="text-gray-700">&nbsp;-&nbsp;{this.props.year}</span>
        </div>
        {
          this.props.hasSubject &&
          <button className="self-center w-full md:w-auto flex-none p-2 mt-3 md:mt-0 ml-auto shadow-lg rounded-lg border-2 border-pink-700 text-pink-700 hover:bg-teal-100 active:bg-teal-100 focus:bg-teal-100" onClick={this.props.onSearchSimilar}>Search similar</button>
        }
    </div>
    )
  }
}

export default BookDetail