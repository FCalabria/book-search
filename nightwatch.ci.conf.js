const baseConf = require('./nightwatch.conf')

baseConf.test_settings.default.screenshots = {
  enabled: false,
  on_failure: false
}
baseConf.test_workers = {
  enabled: true,
  workers: 'auto'
}

baseConf.detailed_output = false

module.exports = baseConf