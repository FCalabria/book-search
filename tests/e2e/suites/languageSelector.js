module.exports = {
  '@tags': ['language'],
  afterEach: (browser) => {
    browser
    .sauceEnd()
    .end()
  },
  'It should have a language selector': (browser) => {
    const searchPage = browser.page.search()
    searchPage.navigate()
      .expect.section('@language').to.be.visible
  },
  'It should be in spanish by default': browser => {
    const searchPage = browser.page.search()
    searchPage.navigate()
      .section.language
      .assert.containsText('@selectedOption', 'ES')
    searchPage.getAttribute('@searchInput', 'placeholder', result => {
      browser.assert.ok(/busca/i.test(result.value), 'Input placeholder contains the word "busca"')
    })
  },
  'It should be possible to change to english': browser => {
    const searchPage = browser.page.search()
    searchPage.navigate()
      .section.language
      .click('@optionEn')
    searchPage.getAttribute('@searchInput', 'placeholder', result => {
      browser.assert.ok(/search/i.test(result.value), 'Input placeholder contains the word "search"')
    })
  }
}