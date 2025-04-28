import * as fs from 'fs';
import * as path from 'path';

let appTopLevelWindow = '0x00000000'; // valor por defecto

// Read handle from window.json
try {
  const windowData = JSON.parse(fs.readFileSync(path.join(__dirname, 'window.json'), 'utf8'));
  if (windowData.appTopLevelWindow) {
    appTopLevelWindow = windowData.appTopLevelWindow;
    console.log(`✅ Using appTopLevelWindow from window.json: ${appTopLevelWindow}`);
  }
} catch (err) {
  console.warn("⚠️ File 'window.json'. does not exist using handle by default.");
}

exports.config = {
  output: './output',
  helpers: {
    Appium: {
      appiumV2: true,
      path: '/',
      platform: "Windows",
      url: "http://127.0.0.1:4723",
      desiredCapabilities: {

        automationName: "Windows",
        platformName: "Windows",
        'appium:appTopLevelWindow': appTopLevelWindow
      }
    }
  },
  include: {
    I: './steps_file'
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps_desktop.ts']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    }
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
    {
      pattern: 'amOnPage',
      timeout: 0
    }
  ],
  tests: './*_test.ts',
  name: 'ExampleCreateNewRepo'
}