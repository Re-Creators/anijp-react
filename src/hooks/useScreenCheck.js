import { useState, useEffect } from "react";

export default function useScreenCheck() {
  const [screen, setScreen] = useState(null);

  useEffect(() => {
    let hasTouchScreen = false;

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      hasTouchScreen = true;
    }
    setScreen(hasTouchScreen ? "MOBILE" : "DESKTOP");
  }, []);

  return screen;
}
