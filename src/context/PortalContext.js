import { createContext } from "react";
const defaultValue = {
  loading: false,
  setLoading: () => {},
};

export default createContext(defaultValue);
