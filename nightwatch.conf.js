const Services = {}; loadServices();

module.exports = {
  src_folders: ['tests/e2e/suites'],

  page_objects_path: 'tests/e2e/pages',

  custom_commands_path:  '',

  globals_path : 'tests/e2e/globals/server.js',
  output_folder: 'tests/e2e/output',

  webdriver: {},

  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: 'http://localhost:3000/',

      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: true
      },

      desiredCapabilities: {
        browserName : 'firefox'
      },

      webdriver: {
        start_process: true,
        server_path: (Services.geckodriver ? Services.geckodriver.path : '')
      }
    },

    safari: {
      desiredCapabilities : {
        browserName : 'safari',
        alwaysMatch: {
          acceptInsecureCerts: false
        }
      },
      webdriver: {
        port: 4445,
        start_process: true,
        server_path: '/usr/bin/safaridriver'
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
              // '-headless',
              // '-verbose'
            ],
          }
        }
      },
      webdriver: {
        start_process: true,
        port: 4444,
        server_path: (Services.geckodriver ? Services.geckodriver.path : ''),
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
          // This tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
          // w3c: false,
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          args: [
            //'--no-sandbox',
            //'--ignore-certificate-errors',
            //'--allow-insecure-localhost',
            //'--headless'
          ]
        }
      },

      webdriver: {
        start_process: true,
        port: 9515,
        server_path: (Services.chromedriver ? Services.chromedriver.path : ''),
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
        server_path: (Services.seleniumServer ? Services.seleniumServer.path : ''),
        cli_args: {
          'webdriver.gecko.driver': (Services.geckodriver ? Services.geckodriver.path : ''),
          'webdriver.chrome.driver': (Services.chromedriver ? Services.chromedriver.path : '')
        }
      }
    },

    'selenium.chrome': {
      extends: 'selenium',
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions : {
          w3c: false
        }
      }
    },

    'selenium.firefox': {
      extends: 'selenium',
      desiredCapabilities: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          args: [
            // '-headless',
            // '-verbose'
          ]
        }
      }
    }
  }
};

function loadServices() {
  try {
    Services.seleniumServer = require('selenium-server');
  } catch (err) {}

  try {
    Services.chromedriver = require('chromedriver');
  } catch (err) {}

  try {
    Services.geckodriver = require('geckodriver');
  } catch (err) {}
}
