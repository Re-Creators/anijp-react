import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";

function PortalContainer({
  isShow,
  transitionName,
  onCLose,
  children,
  timeout,
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
          className="fixed z-30 inset-0 bg-overlay-dark"
          onClick={() => onCLose()}
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
