const percy = require('@percy/nightwatch')
const chromedriver = require('chromedriver')
const geckodriver = require('geckodriver')
const seleniumServer = require('selenium-server')

module.exports = {
  src_folders: ['tests/e2e/suites'],
  page_objects_path: 'tests/e2e/pages',
  custom_commands_path: [ percy.path, 'tests/e2e/commands' ],
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
            // '--no-sandbox',
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
    },

    saucelabs: {
      username: 'pcalabria',
      access_key: 'e946850e-c948-4838-a50a-1dc86590f2aa',
      'selenium_port': 80,
      'selenium_host': 'ondemand.eu-central-1.saucelabs.com',
      globals: {
        isSaucelabs: true,
      },
      desiredCapabilities: {
        javascriptEnabled: true,
        acceptSslCerts: true,
        build: 'build-local',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER || 'local',
        recordVideo: true,
        recordScreenshots: true,
      },
      webdriver: {
        start_process: false,
        port: 80,
      }
    },

    'saucelabs.chrome': {
      extends: 'saucelabs',
      desiredCapabilities: {
        browserName: 'chrome',
        browserVersion: 'latest-1',
        platformName: 'Windows 10',
          "chromeOptions": {
            "args" : ["--no-sandbox"],
            "w3c": false
          },
      },
    },

    'saucelabs.ie': {
      extends: 'saucelabs',
      desiredCapabilities: {
        browserName: 'internet explorer',
        browserVersion: 'latest',
        platformName: 'Windows 10'
      },
    },

    'saucelabs.safari': {
      extends: 'saucelabs',
      desiredCapabilities: {
        browserName: 'safari',
        browserVersion: 'latest',
        platformName: 'macOS 10.15',
      },
    },

    'saucelabs.iPhone': {
      extends: 'saucelabs',
      desiredCapabilities: {
        browserName: 'Safari',
        appiumVersion: '1.16.0',
        deviceName: 'iPhone 8 Simulator',
        deviceOrientation: 'portrait',
        platformVersion: '13.2',
        platformName: 'iOS',
      },
    },

    'saucelabs.android': {
      extends: 'saucelabs',
      desiredCapabilities: {
        appiumVersion: '1.9.1',
        deviceName: 'Samsung Galaxy S8 GoogleAPI Emulator',
        deviceOrientation: 'portrait',
        browserName: 'Chrome',
        platformVersion: '8.1',
        platformName: 'Android',
      },
    }
  }
};

