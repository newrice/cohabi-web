import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-uql6wxih.jp.auth0.com"
      clientId="pnvoMGANLncHiyXpQU9H0i45UDDr935j"
      redirectUri={window.location.origin}
      audience="https://api-staging.cohabi.runemosuky.com"
      scope="read:current_user update:current_user_metadata"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
