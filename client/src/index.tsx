import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { StylesProvider } from "@material-ui/styles";
import { App } from "./App";
import { ErrorBoundary } from "./components";
import { PlainStoreProvider, StoreProvider } from "./stores";
import "./styles/index.scss";

ReactDOM.render(
  <BrowserRouter>
    <StylesProvider injectFirst>
      <StoreProvider>
        <PlainStoreProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </PlainStoreProvider>
      </StoreProvider>
    </StylesProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
