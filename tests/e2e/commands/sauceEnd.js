const SauceLabs = require('saucelabs').default;
exports.command = function() {
  if (!this.globals.isSaucelabs) {
    return this
  }

  var saucelabs = new SauceLabs({
      user: 'pcalabria',
      key: 'e946850e-c948-4838-a50a-1dc86590f2aa',
      region: 'eu'
  });

  var sessionid = this.capabilities['webdriver.remote.sessionid'];
  var jobName = this.currentTest.name;

  return saucelabs.updateJob('pcalabria', sessionid, {
      passed: this.currentTest.results.failed === 0,
      name: jobName,
      tags: [process.env.TRAVIS_JOB_NUMBER || 'local'],
  })
  .then(() => {
    return this
  })

};