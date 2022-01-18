import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";

function PortalContainer({
  isShow,
  transitionName = "fade",
  onClose,
  children,
  timeout = 300,
  zIndex = 30,
  backgroundColor = "rgba(47, 69, 108, 0.83)",
}) {
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
          onClick={() => onClose()}
          style={{ zIndex: zIndex, backgroundColor: backgroundColor }}
        ></div>
      </CSSTransition>
      <CSSTransition
        in={isShow}
        timeout={timeout}
        classNames={transitionName}
        unmountOnExit
      >
        {children}
      </CSSTransition>
    </>,
    document.getElementById("portal")
  );
}

export default PortalContainer;
