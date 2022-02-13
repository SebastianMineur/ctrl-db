import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import AuthContext from "./contexts/AuthContext";
import ApolloContext from "./contexts/ApolloContext";
import "./index.css";

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
