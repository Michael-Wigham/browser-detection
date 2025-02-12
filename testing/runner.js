const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const retrocycle = require('../utils/retrocycle');

const BrowserDetection = require('../dist/index.js').BrowserDetection;
const TestCases = require('./test-cases.js');

TestCases.forEach(testCase => {
  const { id, expected } = testCase;

  const filePath = path.join('testing', 'dataset', `${id}.json.gz`);

  const compressedJson = fs.readFileSync(filePath);
  const json = zlib.gunzipSync(compressedJson);

  const { window } = retrocycle(JSON.parse(json));

  it(`Testing ${id}`, () => {
    BrowserDetection.helpers.windowObject = window;
    expect(BrowserDetection()).toEqual(expected);
  });
});
