import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";

function PortalContainer({
  isShow,
  transitionName,
  onCLose,
  children,
  timeout,
  zIndex = 30,
  backgroundColor = "rgba(29, 29, 29, 0.65)",
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
          onClick={() => onCLose()}
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
