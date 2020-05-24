const server = require('../server');
module.exports = {
  before: function(browser, done) {
    server.listen(3000, () => {
      console.log('Running at http://localhost:3000');
      done()
    });
  },
  after: function() {
    server.close()
  }
}