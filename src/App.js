import React from 'react';
import SearchBar from './components/SearchBar'
import apiFetch from './utils/api'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchData: [],
    }
    this.onNewSearch = this.onNewSearch.bind(this)
  }

  onNewSearch(searchTerm) {
    this.setState({searchTerm})
    apiFetch(`search.json?q=${encodeURIComponent(searchTerm)}`)
      .then(result => this.setState({searchData: result.docs}))
  }

  render() {
    return (
      <div className={`App flex justify-center ${ this.state.searchData ? 'absolute inset-0 items-center' : 'mt-4'}`} >
          <SearchBar onSearch={this.onNewSearch}/>
        </div>
    );
  }
}

export default App;
