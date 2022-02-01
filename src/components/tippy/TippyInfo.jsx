import Tippy from "@tippyjs/react/headless";

function TippyInfo({ children, content }) {
  return (
    <Tippy
      render={(attrs) => (
        <div
          className="rounded-md bg-black px-3 py-1 text-xs text-white"
          tabIndex="-1"
          {...attrs}
        >
          {content}
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default TippyInfo;
