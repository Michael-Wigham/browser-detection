import $ from '../helpers';
import { detectChromium } from './chromium';

import { browserDetection, Browsers } from '../types';

export function detectOpera(): browserDetection {
  var appVersion = $.getFeature('navigator.appVersion');

  var browser: Browsers = 'Opera';

  if (!appVersion.match(/Opera|OPR\//)) {
    return;
  }

  // Opera is based on Chromium since v15
  var chromiumFeatures = detectChromium();

  if (!chromiumFeatures) {
    return;
  }

  // For the Opera to Chromium version mapping:
  // https://help.opera.com/en/opera-version-history/
  var chromiumVersion = chromiumFeatures.browserVersion;

  return Object.assign(chromiumFeatures, {
    browser: browser,
    browserVersion: chromiumVersion - 13
  });
}
