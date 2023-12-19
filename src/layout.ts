import $ from './helpers';

import { Layout } from './types';

export var LAYOUT_TRIDENT: Layout = 'Trident';
export var LAYOUT_EDGE: Layout = 'EdgeHTML';
export var LAYOUT_GECKO: Layout = 'Gecko';
export var LAYOUT_WEBKIT: Layout = 'WebKit';
export var LAYOUT_BLINK: Layout = 'Blink';
export var LAYOUT_KHTML: Layout = 'KHTML';
export var LAYOUT_PRESTO: Layout = 'Presto';

export function detectLayout(): Layout {
  // EdgeHTML || Trident
  if ($.hasStyle('msScrollLimit') || $.hasStyle('behavior')) {
    // TODO: there was `CSS.supports('(-ms-ime-align:auto)')`
    if ($.hasFeature('CSS')) {
      return LAYOUT_EDGE;
    }

    return LAYOUT_TRIDENT;
  }

  // Gecko
  if ($.hasStyle('MozAppearance')) {
    return LAYOUT_GECKO;
  }

  // Presto (Opera <15)
  if ($.hasStyle('OLink')) {
    return LAYOUT_PRESTO;
  }

  // KHTML
  if ($.hasStyle('KhtmlUserInput')) {
    return LAYOUT_KHTML;
  }

  // WebKit and Blink
  // This test must be executed at the end:
  // Firefox and Edge also support -webkit-appearance, for compatibility reasons.
  if ($.hasStyle('webkitAppearance')) {
    if ($.hasFeature('Intl.v8BreakIterator') && $.hasFeature('CSS.supports')) {
      return LAYOUT_BLINK;
    }

    return LAYOUT_WEBKIT;
  }
}
