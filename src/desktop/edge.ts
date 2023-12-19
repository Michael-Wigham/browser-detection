import $ from '../helpers';
import { detectOS } from '../os';
import { LAYOUT_EDGE, detectLayout } from '../layout';
import { detectChromium, detectChromiumVersion } from './chromium';

import { browserDetection, Browsers } from '../types';
let vMap: { feature: string; version: number }[] = [
  { feature: 'AuthenticatorAssertionResponse', version: 44 },
  { feature: 'PaymentRequestUpdateEvent.prototype.bubbles', version: 42 },
  { feature: 'AbortController', version: 41 },
  {
    feature: 'CanvasRenderingContext2D.prototype.imageSmoothingEnabled',
    version: 40
  },
  { feature: 'AudioContext.prototype.close', version: 38 },
  { feature: 'AudioBuffer.prototype.copyFromChannel', version: 25 },
  { feature: 'ANGLE_instanced_arrays.drawArraysInstancedANGLE', version: 20 }
];

export function detectEdge(): browserDetection {
  var browser: Browsers = 'Edge';
  var browserVersion;
  var layout = detectLayout();
  var os = detectOS();

  var chromiumFeatures = detectChromium();
  if (chromiumFeatures) {
    if ($.hasPlugin('Microsoft Edge PDF Plugin')) {
      return Object.assign(chromiumFeatures, {
        browser: browser
      });
    }
  }

  // Edge with EdgeHTML
  if (layout === LAYOUT_EDGE) {
    for (let value of vMap) {
      if ($.hasFeature(value.feature)) {
        browserVersion = value.version;
        break;
      }
    }
  }

  if (browserVersion) {
    return Object.assign(os, {
      browser: browser,
      browserVersion: browserVersion,
      layout: layout,
      layoutVersion: undefined
    });
  } else if ($.getFeature('navigator.appVersion').match('Edg')) {
    browserVersion = detectChromiumVersion();
    return Object.assign(os, {
      browser: browser,
      browserVersion: browserVersion,
      layout: layout,
      layoutVersion: undefined
    });
  }
}
