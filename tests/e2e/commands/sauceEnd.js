const SauceLabs = require('saucelabs').default;
exports.command = function() {
  if (!this.globals.isSaucelabs) {
    return this
  }

  var saucelabs = new SauceLabs({
      user: process.env.SAUCE_USERNAME,
      key: process.env.SAUCE_ACCESS_KEY,
      region: process.env.CI ? '' : 'eu'
  });

  var sessionid = this.capabilities['webdriver.remote.sessionid'];
  var jobName = this.currentTest.name;

  return saucelabs.updateJob(process.env.SAUCE_USERNAME, sessionid, {
      passed: this.currentTest.results.failed === 0,
      name: jobName,
      tags: [process.env.TRAVIS_JOB_NUMBER || 'local'],
  })
  .then(() => {
    return this
  })

};