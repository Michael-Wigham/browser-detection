import $ from '../helpers';
import { detectChromium } from './chromium';

import { browserDetection, Browsers } from '../types';

export function detectChrome(): browserDetection {
  var browser: Browsers = 'Chrome';

  // Chrome is based on Chromium
  var chromiumFeatures = detectChromium();

  if (!chromiumFeatures) {
    return;
  }

  // Chromium v41 has both plugins
  if ($.hasPlugin('Chrome PDF Viewer') && !$.hasPlugin('Chromoting Viewer')) {
    return Object.assign(chromiumFeatures, {
      browser: browser
    });
  }
}
