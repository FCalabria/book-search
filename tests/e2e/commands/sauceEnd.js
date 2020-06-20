const SauceLabs = require('saucelabs').default;
exports.command = function() {
  /*
  From nightwatch docs:
  The command module needs to export a command function, which needs to call at least one Nightwatch api method (such as .execute()).
  This is due to a limitation of how the asynchronous queueing system of commands works. You can also wrap everything in a .perform() call
  */
  this.perform(() => {
    if (!this.globals.isSaucelabs) {
      return Promise.resolve(this)
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
  })

};