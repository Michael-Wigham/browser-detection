import { detectEdge } from './desktop/edge';
import { detectFirefox } from './desktop/firefox';
import { detectChrome } from './desktop/chrome';
import { detectInternetExplorer } from './desktop/ie';
import { detectOpera } from './desktop/opera';
import { detectSafari } from './desktop/safari';
import { detectBrave } from './desktop/brave';
import { detectSafariMobile } from './mobile/safari-mobile';
import { hasFeature } from './feature';
import { detectChromeMobile } from './mobile/chrome-mobile';
import { detectDuckDuckGoMobile } from './mobile/duckduckgo-mobile';

function isMobile() {
  return (
    hasFeature('orientation') ||
    // Mobile do not have plugins
    (hasFeature('navigator.plugins') && navigator.plugins.length === 0)
  );
}

export default function BrowserDetection() {
  if (isMobile()) {
    return (
      detectDuckDuckGoMobile() || detectChromeMobile() || detectSafariMobile()
    );
  } else {
    return (
      detectEdge() ||
      detectInternetExplorer() ||
      detectFirefox() ||
      detectBrave() ||
      detectOpera() ||
      detectChrome() ||
      detectSafari()
    );
  }
}
