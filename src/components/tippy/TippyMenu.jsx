import Tippy from "@tippyjs/react/headless";

function TippyMenu({ toggleMenu, children, onShowModal }) {
  return (
    <Tippy
      render={(attrs) => (
        <div className="bg-secondary rounded-sm" {...attrs}>
          <ul className="text-white p-1 text-sm">
            <li className="px-3 py-2 pr-10 hover:bg-primary-300 rounded-sm">
              <button>Add to queue</button>
            </li>
            <li
              className="px-3 py-2  pr-10 hover:bg-primary-300 rounded-sm"
              onClick={onShowModal}
            >
              <button>Add to Playlist</button>
            </li>
          </ul>
        </div>
      )}
      trigger="click"
      interactive={true}
      onShow={toggleMenu}
      onHide={toggleMenu}
      appendTo="parent"
    >
      {children}
    </Tippy>
  );
}

export default TippyMenu;
