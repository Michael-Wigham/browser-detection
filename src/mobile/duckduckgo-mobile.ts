import $ from '../helpers';
import { detectOS } from '../os';
import { LAYOUT_WEBKIT, detectLayout } from '../layout';

import { browserDetection, Browsers } from '../types';

export function detectDuckDuckGoMobile(): browserDetection {
  var browser: Browsers = 'Duck Duck Go';
  var browserVersion;
  var layout = detectLayout();
  var os = detectOS();

  // Allowed layouts
  if ([LAYOUT_WEBKIT].indexOf(layout) === -1) {
    return;
  }

  if ($.hasFeature('duckduckgoBlockerData')) {
    // Removed from 7.34
    // https://github.com/duckduckgo/iOS/commit/5a16089bfece04ddaf333adb16dbc7a1f86e5b10#diff-32b6e9080952409c646023fa8e790596L20
    browserVersion = '<7.34';
  } else {
    return;
  }

  if (browserVersion) {
    return Object.assign(os, {
      browser: browser,
      browserVersion: browserVersion,
      layout: layout,
      layoutVersion: undefined
    });
  }
}
