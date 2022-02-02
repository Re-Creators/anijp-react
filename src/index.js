import React from "react";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import store from "./app/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>,
  document.getElementById("root")
);
