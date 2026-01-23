import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import RouterPages from "./routes/Router.jsx";
import { ReactSession } from 'react-client-session';

ReactSession.setStoreType("localStorage");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterPages />
  </React.StrictMode>
);

