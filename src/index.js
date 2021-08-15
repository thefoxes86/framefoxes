import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "overmind-react";
import { overmind } from "utils/overmind";

const redirectUri =
  process.env.NODE_ENV === "production"
    ? "https://xdesigners.hopto.org/home"
    : "http://localhost:3000/";

const providerConfig = {
  domain: "dev-cs35xkuf.us.auth0.com",
  clientId: "6te68h4f3HTQMF25xpXegB3fgeygUu95",
  audience: "https://dev-cs35xkuf.us.auth0.com/api/v2/",
  redirectUri: redirectUri,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider overmind={overmind}>
      <Auth0Provider {...providerConfig}>
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
