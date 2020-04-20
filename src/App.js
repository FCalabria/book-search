import React from 'react';
import SearchBar from './components/SearchBar'

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
    console.log('MSG: App -> onNewSearch -> searchTerm', searchTerm)
    this.setState({searchTerm}, () => {
      console.log(this.state)
    })
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
