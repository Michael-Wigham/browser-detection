export type Browsers =
  | 'Brave'
  | 'Chrome'
  | 'Chromium'
  | 'Edge'
  | 'Firefox'
  | 'IE'
  | 'Opera'
  | 'Safari'
  | 'Chrome Mobile'
  | 'Duck Duck Go';

export type OS =
  | 'Mac OS'
  | 'iOS'
  | 'Windows'
  | 'Android'
  | 'Linux'
  | 'OpenBSD'
  | 'Unix'
  | 'Solaris';

export type Layout =
  | 'Trident'
  | 'EdgeHTML'
  | 'Gecko'
  | 'WebKit'
  | 'Blink'
  | 'KHTML'
  | 'Presto';

export interface osDetection {
  os: OS;
  osVersion: any;
}

export interface layoutDetection {
  layout: Layout;
  layoutVersion: any;
}

export interface browserDetection {
  os: OS;
  osVersion: any;
  browser: Browsers;
  browserVersion: any;
  layout: Layout;
  layoutVersion: any;
}
