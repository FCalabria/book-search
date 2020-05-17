module.exports = {
  'It should have an input and search button': browser => {
    browser.url(browser.launchUrl)
    .waitForElementVisible('body')
    .assert.visible('input[type=text]')
    .end()
  },
}
