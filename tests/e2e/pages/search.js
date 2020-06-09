module.exports = {
  url: function () {return this.api.launchUrl},
  elements: {
    searchInput: 'input[data-test="searchInput"]',
    searchButton: 'button[data-test="searchButton"]',
  },
  sections: {
    language: {
      selector: '[data-test="languageSelect"]',
      elements: {
        optionEs: 'option[value="ES"]',
        optionEn: 'option[value="EN"]',
        selectedOption: 'option[selected]'
      }
    },
    firstResult: {
      selector: '[data-test="resultsList"]>*:first-child',
      elements: {
        image: 'img',
        bookInfo: '[data-test="bookInfoWrapper"]',
        similarButton: 'button'
      }
    }
  },
  commands: [{
    searchTerm: function(term) {
      // Dont use arrow function, or you'll break **this**
      return this.navigate()
      .setValue('@searchInput', term)
      .click('@searchButton')
    }
  }]
}