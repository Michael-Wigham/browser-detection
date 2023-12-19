import $ from '../helpers';
import { detectOS } from '../os';
import { LAYOUT_BLINK, detectLayout } from '../layout';

import { browserDetection, Browsers } from '../types';

let vMap: { feature: string; version: number }[] = [
  { feature: 'CloseWatcher', version: 120 },
  // { feature: 'document.requestStorageAccess', version: 119 },   // No Test
  // { feature: 'WindowSharedStorage', version: 117 },             // No Test
  // { feature: 'documentPictureInPicture', version: 116 },        // No Test
  // { feature: 'WGSLLanguageFeatures', version: 115 },            // No Test
  // { feature: 'credentialless', version: 110 },                  // No Test
  // { feature: 'LaunchQueue', version: 102 },                     // No Test
  { feature: 'CookieStore', version: 87 },
  { feature: 'CompressionStream', version: 80 },
  { feature: 'GeolocationCoordinates', version: 79 },
  { feature: 'RTCDataChannel.prototype.maxPacketLifeTime', version: 78 },
  { feature: 'FormDataEvent', version: 77 },
  { feature: 'HTMLDocument.prototype.onsecuritypolicyviolation', version: 76 },
  { feature: 'HTMLVideoElement.prototype.playsInline', version: 75 },
  { feature: 'TextEncoder.prototype.encodeInto', version: 74 },
  { feature: 'RTCRtpReceiver.prototype.getParameters', version: 73 },
  { feature: 'Intl.ListFormat', version: 72 },
  { feature: 'ShadowRoot.prototype.fullscreenElement', version: 71 },
  { feature: 'MediaStreamTrack.prototype.contentHint', version: 70 },
  { feature: 'webkitRTCPeerConnection.prototype.getTransceivers', version: 69 },
  { feature: 'CustomElementRegistry.prototype.upgrade', version: 68 },
  { feature: 'DataView.prototype.setBigUint64', version: 67 },
  { feature: 'AbortController', version: 66 },
  { feature: 'PerformanceObserver.prototype.takeRecords', version: 65 },
  { feature: 'Document.prototype.alinkColor', version: 64 },
  { feature: 'HTMLFrameSetElement.prototype.onbeforeprint', version: 63 },
  { feature: 'HTMLDataElement', version: 62 },
  { feature: 'SVGAnimationElement.prototype.getAttributeNames', version: 61 },
  { feature: 'BroadcastChannel.prototype.onmessageerror', version: 60 },
  { feature: 'ImageCapture.prototype.getPhotoCapabilities', version: 59 },
  { feature: 'AudioContext.prototype.baseLatency', version: 58 },
  { feature: 'AudioContext.prototype.getOutputTimestamp', version: 57 },
  { feature: 'BaseAudioContext.prototype.createConstantSource', version: 56 },
  { feature: 'document.body.onauxclick', version: 55 },
  { feature: 'Attr.prototype.getRootNode', version: 54 },
  { feature: 'Element.prototype.attachShadow', version: 53 },
  { feature: 'AudioListener.prototype.forwardX', version: 52 },
  { feature: 'CanvasCaptureMediaStreamTrack', version: 51 },
  { feature: 'DOMTokenList.prototype.value', version: 50 },
  { feature: 'URLSearchParams.prototype.toString', version: 49 },
  { feature: 'webkitIDBIndex.prototype.getAll', version: 48 },
  { feature: 'CSSNamespaceRule', version: 47 },
  { feature: 'Performance.prototype.onresourcetimingbufferfull', version: 46 },
  { feature: 'ServiceWorkerContainer.prototype.getRegistrations', version: 45 },
  { feature: 'URIError.stackTraceLimit', version: 44 },
  { feature: 'AnimationEvent', version: 43 },
  { feature: 'AudioContext.prototype.close', version: 42 },
  { feature: 'AudioContext.prototype.resume', version: 41 },
  { feature: 'HTMLButtonElement.prototype.reportValidity', version: 40 }
];

export function detectChromiumVersion() {
  for (let value of vMap) {
    if ($.hasFeature(value.feature)) {
      return value.version;
    }
  }
}

export function detectChromium(): browserDetection {
  var browser: Browsers = 'Chromium';
  var browserVersion;
  var layout = detectLayout();
  var os = detectOS();

  if ([LAYOUT_BLINK].indexOf(layout) === -1) {
    return;
  }

  // TODO: It's quite ok for now, but maybe we want to improve this check
  if (!$.hasFeature('chrome')) {
    return;
  }

  browserVersion = detectChromiumVersion();

  if (!browserVersion) {
    return;
  }

  return Object.assign(os, {
    browser: browser,
    browserVersion: browserVersion,
    layout: layout,
    layoutVersion: undefined
  });
}
