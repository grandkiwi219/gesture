import { CSSProperties } from "react";

export function styling(selector: string, properties: CSSProperties) {
    return selector + '{'
        + Object.keys(properties).map(key => {
            const value = properties[key as keyof typeof properties];
            return value ? (kebabCase(key) + ': ' + value + ';') : '';
        }).join('')
    + '}';
}

function kebabCase(str: string) {
    return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
}

