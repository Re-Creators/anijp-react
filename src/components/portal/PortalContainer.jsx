import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";
import { useMemo, useState } from "react";
import PortalContext from "../../context/PortalContext";

function PortalContainer({
  isShow,
  transitionName = "fade",
  onClose,
  children,
  timeout = 300,
  zIndex = 30,
  backgroundColor = "rgba(47, 69, 108, 0.83)",
}) {
  const [loading, setLoading] = useState(false);
  const value = useMemo(() => ({ loading, setLoading }), [loading]);
  return createPortal(
    <>
      <CSSTransition
        in={isShow}
        timeout={timeout}
        classNames="fade"
        unmountOnExit
      >
        <div
          className={`fixed inset-0 bg-overlay-dark`}
          onClick={() => !loading && onClose()}
          style={{ zIndex: zIndex, backgroundColor: backgroundColor }}
        ></div>
      </CSSTransition>
      <PortalContext.Provider value={value}>
        <CSSTransition
          in={isShow}
          timeout={timeout}
          classNames={transitionName}
          unmountOnExit
        >
          {children}
        </CSSTransition>
      </PortalContext.Provider>
    </>,
    document.getElementById("portal")
  );
}

export default PortalContainer;
