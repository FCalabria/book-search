const chromedriver = require('chromedriver')
const geckodriver = require('geckodriver')
const seleniumServer = require('selenium-server')

module.exports = {
  src_folders: ['tests/e2e/suites'],
  page_objects_path: 'tests/e2e/pages',
  custom_commands_path: ['tests/e2e/commands' ],
  globals_path: 'tests/e2e/globals/server.js',

  output_folder: 'tests/e2e/output',

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
        extendedDebugging : true,
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
      username: process.env.SAUCE_USERNAME,
      access_key: process.env.SAUCE_ACCESS_KEY,
      'selenium_port': 80,
      'selenium_host': 'ondemand.eu-central-1.saucelabs.com',
      globals: {
        isSaucelabs: true,
        waitForConditionTimeout: 10000,
        waitForConditionPollInterval: 5000
      },
      desiredCapabilities: {
        javascriptEnabled: true,
        acceptSslCerts: true,
        build: 'build-local',
        'tunnel-identifier': 'local',
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
        version: 'latest',
        platform: 'macOS 10.15',
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
        deviceName: 'Android Emulator',
        deviceOrientation: 'portrait',
        browserName: 'Chrome',
        platformVersion: '6.0',
        platformName: 'Android',
      },
    }
  }
};