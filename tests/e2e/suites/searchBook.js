let searchPage
module.exports = {
  '@tags': ['search'],
  beforeEach: browser => {
    searchPage = browser.page.search()
  },
  afterEach: (browser) => {
    browser.end()
  },
  'It should have input and search button': () => {
    searchPage.navigate()
      .assert.visible('@searchInput')
      .assert.visible('@searchButton')
  },
  'It should render the list of results after a search': () => {
    searchPage.searchTerm('Hulk')
      .section.firstResult
      .assert.visible('@bookInfo')
      .assert.visible('@similarButton')
      .assert.visible('@image')
      .assert.containsText('@bookInfo', 'Hulk')
  },
}