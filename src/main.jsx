import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import router from "./Routes";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./features";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
