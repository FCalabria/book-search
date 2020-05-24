let searchPage
module.exports = {
  '@tags': ['visual'],
  beforeEach: browser => {
    searchPage = browser.page.search()
  },

  afterEach: browser => {
    // Calling .end right before percySnapshot causes buggy behaviour on percy
    browser.pause(10)
    browser.end()
  },
  'Home screen': () => {
    searchPage.navigate()
      .waitForElementVisible('@searchInput')
      .percySnapshot('Home screen')
  },
  'Results screen': () => {
    searchPage.searchTerm('Matilda')
      .section.firstResult
      .waitForElementVisible('@image')
      .percySnapshot('Results screen')
  },
  'Error screen': () => {
    searchPage.searchTerm('ASDasdfasdnsañdfjiaoASDFa')
    .waitForElementNotPresent(searchPage.section.firstResult.selector)
    .percySnapshot('Error screen')
  },
}
