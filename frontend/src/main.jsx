import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import AuthContext from "./contexts/AuthContext";
import ApolloContext from "./contexts/ApolloContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloContext>
        <AuthContext>
          <App />
        </AuthContext>
      </ApolloContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
