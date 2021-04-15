module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  src_folders : ["scripts"],
  skip_testcases_on_fail: false,

  webdriver: {
    start_process: true,
    server_path: "node_modules/.bin/chromedriver",
    port: 9515
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: "chrome",
        acceptSslCerts: true,
        acceptInsecureCerts: true,
        webStorageEnabled : true,
        chromeOptions: {
          w3c: false,
          args: [
            "--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
            // '--lang="en-US,en;q=0.9"',
            // "headless",
            "no-sandbox",
            "disable-gpu",
            "ignore-certificate-errors"
            ]
        }
      }
    },
  },
};
