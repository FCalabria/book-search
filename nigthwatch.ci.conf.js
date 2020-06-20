const baseConf = require('./nightwatch.conf')

baseConf.test_settings.default.screenshots = {
  enabled: false,
  on_failure: false
}
baseConf.detailed_output = false

baseConf.test_settings.saucelabs.selenium_host = 'ondemand.us-west-1.saucelabs.com'
baseConf.test_settings.saucelabs.desiredCapabilities["tunnel-identifier"] = process.env.TRAVIS_JOB_NUMBER
baseConf.test_settings.saucelabs.desiredCapabilities.build = process.env.TRAVIS_BUILD_NUMBER

module.exports = baseConf