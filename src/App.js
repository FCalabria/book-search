import React from 'react';
import SearchBar from './components/SearchBar'
import Loader from './components/Loader'
import BookDetail from './components/BookDetail'
import LanguageToggler from './components/LanguageToggler'
import apiFetch from './utils/api'
import {LanguageProvider, languages} from './language-context'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchData: [],
      searchFound: -1,
      searchStarted: false,
      language: {
        language: languages.ES,
        keys: Object.keys(languages),
        selected: 'ES',
      }
    }
    this.onNewSearch = this.onNewSearch.bind(this)
    this.onSubjectSearch = this.onSubjectSearch.bind(this)
    this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this)
    this.toggleLanguage = this.toggleLanguage.bind(this)
  }

  onChangeSearchTerm(searchTerm) {
    this.setState({searchTerm})
  }
  onNewSearch() {
    this.setState({searchFound: -1, searchStarted: true})
    apiFetch(`search.json?q=${encodeURIComponent(this.state.searchTerm).replace('%20', '+')}&mode=ebooks&has_fulltext=true&page=1`)
      .then(result => this.setState({
        searchData: result.docs.filter(result => result.isbn),
        searchFound: result.numFound
      }))
  }

  onSubjectSearch(subject) {
    this.setState({searchTerm: subject, searchFound: -1})
    apiFetch(`search.json?subject=${encodeURIComponent(subject).replace('%20', '+')}&mode=ebooks&has_fulltext=true&page=1`)
      .then(result => this.setState({
        searchData: result.docs.filter(result => result.isbn),
        searchFound: result.numFound
      }))
  }

  toggleLanguage(value) {
    this.setState({language:{
      language: languages[value],
      keys: Object.keys(languages),
      selected: value,
    }})
  }

  render() {
    return (
    <LanguageProvider value={{
      ...this.state.language,
      toggleLanguage: this.toggleLanguage
    }}>
      <div className={`App flex items-center flex-col absolute inset-0 ${ !this.state.searchStarted ? 'justify-center' : 'mt-4'}`} >
          <LanguageToggler></LanguageToggler>
          <SearchBar onSearch={this.onNewSearch} onChangeSearch={this.onChangeSearchTerm} term={this.state.searchTerm}/>
          {
            (this.state.searchStarted && this.state.searchFound <=0) &&
            <Loader error={this.state.searchFound === 0} searchTerm={this.state.searchTerm}/>
          }
          {
            this.state.searchFound > 0 && (
            <div className="pt-6 w-full" data-test="resultsList">{this.state.searchData.map(searchResult => <BookDetail
              key={searchResult.isbn[0]}
              title={searchResult.title}
              author={searchResult.author_name && searchResult.author_name[0]}
              year={searchResult.first_publish_year}
              isbn={searchResult.isbn}
              hasSubject={!!searchResult.subject}
              onSearchSimilar={this.onSubjectSearch.bind(this, searchResult.subject[0])}
            />)}</div>
            )
          }
        </div>
      </LanguageProvider>
    );
  }
}

export default App;
