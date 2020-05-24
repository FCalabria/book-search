let searchPage
module.exports = {
  '@tags': ['search'],
  beforeEach: browser => {
    searchPage = browser.page.search()
  },

  afterEach: browser => {
    // Calling .end right before percySnapshot causes buggy behaviour on percy
    browser.pause(10)
    browser.end()
  },
  'It should have an input and search button': () => {
    searchPage.navigate()
      .assert.visible('@searchInput')
      .assert.visible('@searchButton')
      .percySnapshot('Home screen')
  },
  'It should show the list of results after a correct search': () => {
    searchPage.searchTerm('Matilda')
      .section.firstResult
      .assert.visible('@image')
      .assert.visible('@bookInfo')
      .assert.visible('@similarButton')
      .assert.containsText('@bookInfo', 'Matilda')
      .percySnapshot('Results screen')
  },
  'It should show an error text for search errors': () => {
    searchPage.searchTerm('ASDasdfasdnsañdfjiaoASDFa')
    // This will match the "searching" text
    // .assert.containsText('body', 'ASDasdfasdnsañdfjiaoASDFa')
    .expect.element('body').text.to.match(/^no[\w\s]*ASDasdfasdnsañdfjiaoASDFa$/im)
    // Order is important here (wait for error message to appear, then assert that theres no results)
    searchPage.assert.not.elementPresent(searchPage.section.firstResult.selector)
      .percySnapshot('Error screen')
  },
  'It should search by term when the similarButton is clicked': () => {
    searchPage.searchTerm('Matilda')
      .section.firstResult
      .click('@similarButton')
    searchPage.waitForElementVisible('.lds-heart')
    searchPage.section.firstResult
      .waitForElementVisible('@bookInfo', 10000)
      .assert.visible('@bookInfo')
      .assert.not.containsText('@bookInfo', 'Matilda')
  }
}