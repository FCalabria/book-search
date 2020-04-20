import React from 'react';
import SearchBar from './components/SearchBar'

function App() {
  let searchData = []

  return (
    <div className={`App flex justify-center ${ searchData ? 'absolute inset-0 items-center' : 'mt-4'}`} >
        <SearchBar />
      </div>
  );
}

export default App;
