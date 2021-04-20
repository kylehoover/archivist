import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ErrorBoundary } from "./components";
import { PlainStoreProvider, StoreProvider } from "./stores";
import "./styles/index.scss";

ReactDOM.render(
  <BrowserRouter>
    <StoreProvider>
      <PlainStoreProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </PlainStoreProvider>
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
