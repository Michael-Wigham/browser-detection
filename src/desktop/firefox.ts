import $ from '../helpers';
import { detectOS } from '../os';
import { LAYOUT_GECKO, detectLayout } from '../layout';

import { browserDetection, Browsers } from '../types';

let vMap: { feature: string; version: number }[] = [
  { feature: 'ToggleEvent', version: 120 },
  { feature: 'document.head.role', version: 119 },
  { feature: 'document.body.style.font-synthesis-position', version: 118 },
  { feature: 'RTCEncodedAudioFrame', version: 117 },
  { feature: 'ServiceWorkerRegistration.prototype.active', version: 74 },
  {
    feature: 'document.documentElement.style.overscroll-behavior-block',
    version: 73
  },
  { feature: 'FormDataEvent', version: 72 },
  { feature: 'MathMLElement', version: 71 },
  { feature: 'AudioContext.prototype.baseLatency', version: 70 },
  { feature: 'Blob.prototype.arrayBuffer', version: 69 },
  {
    feature: 'AudioContext.prototype.createMediaStreamTrackSource',
    version: 68
  },
  { feature: 'InputEvent.prototype.data', version: 67 },
  { feature: 'HTMLSlotElement.prototype.assignedElements', version: 66 },
  { feature: 'HTMLMarqueeElement', version: 65 },
  { feature: 'Document.prototype.exitFullscreen', version: 64 },
  { feature: 'Animation.prototype.effect', version: 63 },
  { feature: 'DOMPointReadOnly.prototype.toJSON', version: 62 },
  { feature: 'String.prototype.trimStart', version: 61 },
  { feature: 'Animation.prototype.updatePlaybackRate', version: 60 },
  { feature: 'Animation.prototype.pending', version: 59 },
  { feature: 'FontFace.prototype.display', version: 58 },
  { feature: 'AbortController', version: 57 },
  { feature: 'Document.prototype.onvisibilitychange', version: 56 },
  { feature: 'RTCRtpSender.prototype.getStats', version: 55 },
  { feature: 'URL.prototype.toJSON', version: 54 },
  { feature: 'BaseAudioContext.prototype.state', version: 53 },
  { feature: 'ConstantSourceNode', version: 52 },
  {
    feature: 'CanvasRenderingContext2D.prototype.imageSmoothingEnabled',
    version: 51
  },
  { feature: 'Object.getOwnPropertyDescriptors', version: 50 },
  { feature: 'CanvasRenderingContext2D.prototype.filter', version: 49 },
  { feature: 'Animation', version: 48 },
  { feature: 'IDBKeyRange.prototype.includes', version: 47 },
  { feature: 'History.prototype.scrollRestoration', version: 46 },
  { feature: 'Element.prototype.getAttributeNames', version: 45 },
  { feature: 'URLSearchParams.prototype.entries', version: 44 },
  { feature: 'HTMLCanvasElement.prototype.captureStream', version: 43 },
  { feature: 'Reflect', version: 42 }
];
export function detectFirefox(): browserDetection {
  var browser: Browsers = 'Firefox';
  var browserVersion;
  var layout = detectLayout();
  var os = detectOS();

  // Allowed layouts
  if ([LAYOUT_GECKO].indexOf(layout) === -1) {
    return;
  }

  if (
    !$.hasFeature('InstallTrigger') &&
    !$.hasFeature('Error.prototype.toSource')
  ) {
    return;
  }

  for (let value of vMap) {
    if ($.hasFeature(value.feature)) {
      browserVersion = value.version;
      break;
    }
  }

  return Object.assign(os, {
    browser: browser,
    browserVersion: browserVersion,
    layout: layout,
    layoutVersion: undefined
  });
}
