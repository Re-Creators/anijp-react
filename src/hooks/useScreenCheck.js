import { useState, useEffect } from "react";

export default function useScreenCheck() {
  const [screen, setScreen] = useState(null);

  useEffect(() => {
    let hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0 && window.innerWidth < 640;
    } else if ("msMaxTouchPoints" in navigator) {
      hasTouchScreen =
        navigator.msMaxTouchPoints > 0 && window.innerWidth < 640;
    } else {
      var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
      if (mQ && mQ.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
      } else if ("orientation" in window) {
        hasTouchScreen = true; // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen =
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
    setScreen(hasTouchScreen ? "MOBILE" : "DESKTOP");
  }, []);

  return screen;
}
