import React from "react";
import ReactDOM from "react-dom/client";

import "./CSS/root.css" with { type: "css" };
import "./index.css" with { type: "css" };

import App from "./App";

import utils from "./utils";

const root_element = document.body;

if (!root_element) throw new Error("root is undefined");

const root = ReactDOM.createRoot(root_element);

utils.decideTheme();

root.render(
    <React.StrictMode>

        <noscript>You need to enable JavaScript to run this app.</noscript>

        <App></App>
        
    </React.StrictMode>
);
