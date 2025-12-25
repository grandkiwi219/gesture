import std from './std';

function decideTheme() {
    const is_dark_mode: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    let storage_theme: string | null = null;
    
    try {
        const theme: string = localStorage.getItem(std.key.theme) ?? '';
    
        if (getIsValidEnumValue(std.Theme, theme))
            storage_theme = theme;
    } catch (e) {}

    let selected_theme: string;
    
    if (storage_theme) {
        selected_theme = storage_theme;
    }
    else if (is_dark_mode) {
        selected_theme = std.Theme.Dark;
        localStorage.setItem(std.key.theme, std.Theme.Dark);
    }
    else {
        selected_theme = std.Theme.Light;
    }

    document.documentElement.setAttribute(std.key.theme, selected_theme);
}

function getIsValidEnumValue(enumObject: any, value: number | string) {
   return Object.keys(enumObject)
      .filter((key) => isNaN(Number(key)))
      .some((key) => enumObject[key] === value);
}

export default {
    decideTheme,
    getIsValidEnumValue
}
