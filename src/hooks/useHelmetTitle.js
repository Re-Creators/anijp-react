import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setHelmetTitle } from "../features/helmet-title/helmetTitleSlice";

export default function useHelmetTitle(defaultTitle) {
  const [title, setTitle] = useState(defaultTitle);
  const dispatch = useDispatch();

  useEffect(() => {
    if (title) {
      dispatch(setHelmetTitle(title));
    }
  }, [title, dispatch]);

  return { setTitle };
}
