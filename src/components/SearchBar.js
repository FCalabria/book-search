import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchValue: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({searchValue: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.onSearch(this.state.searchValue)
  }

  render() {
    return (
      <div>
        <form className="py-2 px-4 rounded-full bg-white shadow-lg" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Busca un libro"
            value={this.state.searchValue}
            onChange={this.handleChange}
            className="bg-transparent"></input>
          <button type="submit" aria-label="Buscar" className="text-pink-700">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
    )
  }
}

export default SearchBar