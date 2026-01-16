import dotenv from 'dotenv';

import config from './package.json' with { type: 'json' };
import { commands } from './service/bg-cmd/commands-types.js';

dotenv.config();

const service_worker = "service/background.js";

const chrome_obj = {
    minimum_chrome_version: "120"
}

const firefox_obj = {}

const addtional_obj = process.env.BROWSER == 'firefox'
? firefox_obj
: chrome_obj;

export default {
    manifest_version: 3,
    name: config.name,
    description: config.description,
    author: config.author,
    version: config.version,
    browser_specific_settings: {
        gecko: {
            id: `{${process.env.GECKO_ID}}`,
            strict_min_version: "136.0"
        }
    },
    content_scripts: [
        {
            matches: ["<all_urls>"],
            css: [
                "css/main.css"
            ],
            js: [
                "src/main.js"
            ],
            run_at: "document_start",
        },
        /* {
            matches: ["<all_urls>"],
            js: [
                "src/repeater.js"
            ],
            run_at: "document_start",
            world: "MAIN"
        }, */
        {
            all_frames: true,
            match_origin_as_fallback: true,
            matches: ["<all_urls>"],
            js: [
                "src/injector.js"
            ],
            run_at: "document_start",
        },
    ],
    background: process.env.BROWSER == 'firefox'
        ? { scripts: [service_worker] }
        : { service_worker: service_worker },
    options_ui: {
        page: "page/options.html",
        open_in_tab: true
    },
    permissions: [
        "storage",
        "unlimitedStorage",
        "tabs",
        "sessions",
        "contextMenus",
        "userScripts"
    ],
    host_permissions: ["<all_urls>"],
    default_locale: 'ko',
    action: {
        /* default_icon: {
            16: "/img/icon.png",
            32: "/img/icon.png",
            48: "/img/icon.png",
            128: "/img/icon.png"
        } */
    },
    /* icons: {
        16: "/img/icon.png",
        32: "/img/icon.png",
        48: "/img/icon.png",
        128: "/img/icon.png"
    }, */
    commands: commands ?? {},
    web_accessible_resources: [
        {
            resources: [
                "src/*"
            ],
            matches: ["<all_urls>"]
        }
    ],
    ...addtional_obj
}
