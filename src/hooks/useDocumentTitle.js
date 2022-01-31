import { useEffect, useState } from "react";

export default function useDocumentTitle(defaultTitle) {
  const [title, setTitle] = useState(defaultTitle);

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return { setTitle };
}
