const percy = require('@percy/nightwatch')
const chromedriver = require('chromedriver')
const geckodriver = require('geckodriver')
const seleniumServer = require('selenium-server')

module.exports = {
  src_folders: ['tests/e2e/suites'],
  page_objects_path: 'tests/e2e/pages',
  custom_commands_path: [ percy.path ],
  globals_path: 'tests/e2e/globals/server.js',

  output_folder: 'tests/e2e/output',

  webdriver: {},

  test_settings: {
    default: {
      launch_url: 'http://localhost:3000',
      disable_error_log: false,

      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: true
      },
      desiredCapabilities : {
        browserName : 'chrome',
      },

      webdriver: {
        start_process: true,
        port: 9515,
        server_path: chromedriver.path
      }
    },

    firefox: {
      desiredCapabilities : {
        browserName : 'firefox',
        alwaysMatch: {
          // Enable this if you encounter unexpected SSL certificate errors in Firefox
          // acceptInsecureCerts: true,
          'moz:firefoxOptions': {
            args: [
              '-headless',
              // '-verbose'
            ],
          }
        }
      },
      webdriver: {
        start_process: true,
        port: 4444,
        server_path: geckodriver.path,
        cli_args: [
          // very verbose geckodriver logs
          // '-vv'
        ]
      }
    },

    chrome: {
      desiredCapabilities : {
        browserName : 'chrome',
        chromeOptions : {
          args: [
            //'--no-sandbox',
            //'--ignore-certificate-errors',
            //'--allow-insecure-localhost',
            '--headless'
          ]
        }
      },

      webdriver: {
        start_process: true,
        port: 9515,
        server_path: chromedriver.path,
        cli_args: [
          // --verbose
        ]
      }
    },


    //////////////////////////////////////////////////////////////////////////////////
    // Configuration for when using the Selenium service, either locally or remote,  |
    //  like Selenium Grid                                                           |
    //////////////////////////////////////////////////////////////////////////////////
    selenium: {
      // Selenium Server is running locally and is managed by Nightwatch
      selenium: {
        start_process: true,
        port: 4444,
        server_path: seleniumServer.path,
        cli_args: {
          'webdriver.gecko.driver': geckodriver.path,
          'webdriver.chrome.driver': chromedriver.path
        }
      }
    },

    'selenium.chrome': {
      extends: 'selenium',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions : {
          w3c: false,
          args: ['--headless']
        }
      }
    },

    'selenium.firefox': {
      extends: 'selenium',
      desiredCapabilities: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          args: ['-headless']
        }
      }
    }
  }
};

