const languageSection = require('./commonSections').languageSection
module.exports = {
  url: function() { return this.api.launchUrl},
  elements: {
    searchInput: 'input[data-test="searchInput"]',
    searchButton: 'button[data-test="searchButton"]',
  },
  sections: {
    language: languageSection,
    firstResult: {
      selector: '[data-test="resultsList"]>*:first-child',
      elements: {
        image: 'img',
        bookInfo: '[data-test="bookInfoWrapper"]',
        similarButton: 'button'
      },
    },
  },
  commands: [{
    searchTerm: function (term) {
      return this.navigate()
      .setValue('@searchInput', term)
      .click('@searchButton')
    }
  }]
}