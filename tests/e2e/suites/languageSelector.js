module.exports = {
  '@tags': ['language'],
  afterEach: (browser, done) => {
    browser.sauceEnd()
    .end()
    done()
  },
  'It should have a language selector': browser => {
    const searchPage = browser.page.search()
    searchPage.navigate()
      .expect.section('@language').to.be.visible;
  },
  'It should have spanish by default': browser => {
    const searchPage = browser.page.search()
    searchPage.navigate()
      // .section.language
      // .assert.containsText('@selectedOption', 'ES')
      .getValue(searchPage.section.language.selector, text => {
        searchPage.assert.strictEqual(text.value, 'ES')
      })
    searchPage
      .getAttribute('@searchInput', 'placeholder', text => {
        searchPage.assert.ok(/busca/i.test(text.value), 'Input placeholder contains the word "busca"')
      })
  },
  'It should be possible to change to english': browser => {
    const searchPage = browser.page.search()
    searchPage.navigate()
      .click(searchPage.section.language.selector)
      .section.language
      .click('@optionEn')
      searchPage
      .getValue(searchPage.section.language.selector, text => {
        searchPage.assert.strictEqual(text.value, 'EN')
      })
      .getAttribute('@searchInput', 'placeholder', text => {
        searchPage.assert.ok(/search/i.test(text.value), 'Input placeholder contains the word "search"')
      })
  }
}