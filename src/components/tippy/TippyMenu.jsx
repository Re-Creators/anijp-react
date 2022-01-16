import Tippy from "@tippyjs/react/headless";
import { useRef } from "react";

function TippyMenu({ toggleMenu, showTippy, hide, children, onShowModal }) {
  const instanceRef = useRef();

  return (
    <Tippy
      render={(attrs) => (
        <div className="bg-secondary rounded-sm" {...attrs}>
          <ul className="text-white p-1 text-sm">
            <li
              className="px-3 py-2 pr-10 hover:bg-primary-300 rounded-sm"
              onClick={() => {
                instanceRef.current.hide();
              }}
            >
              <button>Add to queue</button>
            </li>
            <li
              className="px-3 py-2  pr-10 hover:bg-primary-300 rounded-sm"
              onClick={() => {
                instanceRef.current.hide();
                onShowModal();
              }}
            >
              <button>Add to Playlist</button>
            </li>
          </ul>
        </div>
      )}
      interactive
      onShow={toggleMenu}
      onHide={toggleMenu}
      trigger="click"
      appendTo="parent"
      onTrigger={(instance) => {
        instanceRef.current = instance;
      }}
    >
      {children}
    </Tippy>
  );
}

export default TippyMenu;
