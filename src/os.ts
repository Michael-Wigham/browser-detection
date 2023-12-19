import $ from './helpers';

import { osDetection, OS } from './types';

var BROWSER_MACOS: OS = 'Mac OS';
var BROWSER_IOS: OS = 'iOS';
var BROWSER_WINDOWS: OS = 'Windows';
var BROWSER_ANDROID: OS = 'Android';
var BROWSER_LINUX: OS = 'Linux';
var BROWSER_OPENBSD: OS = 'OpenBSD';
var BROWSER_UNIX: OS = 'Unix';
var BROWSER_SOLARIS: OS = 'Solaris';

var WINDOWS_NT_VERSION_MAP = {
  '5.1': 'XP',
  '5.2': 'Server 2003',
  '6.0': 'Vista',
  '6.1': 7,
  '6.2': 8,
  '6.3': 8.1,
  '10.0': 10
};

export function detectOSfromAppVersion(): osDetection {
  var appVersion = $.getFeature('navigator.appVersion');

  var os: OS;
  var osVersion;

  var match;

  if ((match = appVersion.match(/Windows NT (\d+)\.(\d+)/))) {
    os = BROWSER_WINDOWS;
    osVersion = WINDOWS_NT_VERSION_MAP[match[1] + '.' + match[2]];
  } else if ((match = appVersion.match(/Mac OS X ((\d+)(_(\d+))?)/))) {
    os = BROWSER_MACOS;
    osVersion = parseFloat(match[1].replace(/_/g, '.'));
  } else if ((match = appVersion.match(/Android ((\d+)(\.(\d+))?)/))) {
    os = BROWSER_ANDROID;
    osVersion = parseFloat(match[1]);
  } else if ((match = appVersion.match(/Linux (i686|x86_64)/))) {
    os = BROWSER_LINUX;
    osVersion = match[1];
  } else if (/OpenBSD/.test(appVersion)) {
    os = BROWSER_OPENBSD;
  } else if (/HP-UX/.test(appVersion)) {
    os = BROWSER_UNIX;
  } else if (/SunOS/.test(appVersion)) {
    os = BROWSER_SOLARIS;
  } else if ((match = appVersion.match(/OS ((\d+)(_(\d+))?)/))) {
    os = BROWSER_IOS;
    osVersion = parseFloat(match[1].replace(/_/g, '.'));
  } else if ((match = appVersion.match(/iPhone OS ((\d+)(_(\d+))?)/))) {
    os = BROWSER_IOS;
    osVersion = parseFloat(match[1].replace(/_/g, '.'));
  } else {
    return;
  }

  return {
    os: os,
    osVersion: osVersion
  };
}

function detectOSfromOscpu(): osDetection {
  var oscpu = $.getFeature('navigator.oscpu');

  // Only Firefox supports this property
  if (!oscpu) {
    return;
  }

  var os: OS;
  var osVersion;

  var match;

  if ((match = oscpu.match(/Windows NT (\d+)\.(\d+)/))) {
    os = BROWSER_WINDOWS;
    osVersion = WINDOWS_NT_VERSION_MAP[match[1] + '.' + match[2]];
  } else if ((match = oscpu.match(/Mac OS X ((\d+)(\.(\d+))?)/))) {
    os = BROWSER_MACOS;
    osVersion = parseFloat(match[1].replace(/_/g, '.'));
  } else if ((match = oscpu.match(/Linux (i686|x86_64)/))) {
    os = BROWSER_LINUX;
    osVersion = match[1];
  } else if (/OpenBSD/.test(oscpu)) {
    os = BROWSER_OPENBSD;
  } else if (/HP-UX/.test(oscpu)) {
    os = BROWSER_UNIX;
  } else if (/SunOS/.test(oscpu)) {
    os = BROWSER_SOLARIS;
  } else {
    return;
  }

  return {
    os: os,
    osVersion: osVersion
  };
}

export function detectOSfromPlatform(): osDetection {
  var platform = $.getFeature('navigator.platform');

  var os: OS;

  if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(platform)) {
    os = BROWSER_MACOS;
  } else if (/iPhone|iPad|iPod/.test(platform)) {
    os = BROWSER_IOS;
  } else if (/Win32|Win64|Windows|WinCE/.test(platform)) {
    os = BROWSER_WINDOWS;
  } else if (/Linux/.test(platform)) {
    os = BROWSER_LINUX;
  } else if (/OpenBSD/.test(platform)) {
    os = BROWSER_OPENBSD;
  } else if (/HP-UX/.test(platform)) {
    os = BROWSER_UNIX;
  } else if (/SunOS/.test(platform)) {
    os = BROWSER_SOLARIS;
  }

  return {
    os: os,
    osVersion: undefined
  };
}

export function detectOS(): osDetection {
  return (
    detectOSfromAppVersion() || detectOSfromOscpu() || detectOSfromPlatform()
  );
}
