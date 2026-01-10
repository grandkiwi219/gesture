import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css" with { type: "css" };
import './CSS/Buttons.css' with { type: 'css' };

import App from "./App";

import utils from "./utils/utils";


const root_element = document.body;

if (!root_element) throw new Error("root is undefined");

const root = createRoot(root_element);

root.render(
    <StrictMode>

        <noscript>You need to enable JavaScript to run this app.</noscript>

        <App></App>
        
    </StrictMode>
);
