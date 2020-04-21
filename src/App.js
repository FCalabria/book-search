import React from 'react';
import SearchBar from './components/SearchBar'
import Loader from './components/Loader'
import apiFetch from './utils/api'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchData: [],
      searchFound: -1,
    }
    this.onNewSearch = this.onNewSearch.bind(this)
  }

  onNewSearch(searchTerm) {
    this.setState({searchTerm, searchFound: -1})
    apiFetch(`search.json?q=${encodeURIComponent(searchTerm)}`)
      .then(result => this.setState({
        searchData: result.docs,
        searchFound: result.numFound
      }))
  }

  render() {
    return (
      <div className={`App flex items-center flex-col absolute inset-0 ${ !this.state.searchTerm ? 'justify-center' : 'mt-4'}`} >
          <SearchBar onSearch={this.onNewSearch}/>
          {
            (this.state.searchTerm && this.state.searchFound <=0) &&
            <Loader error={this.state.searchFound === 0} searchTerm={this.state.searchTerm}/>
          }
        </div>
    );
  }
}

export default App;
