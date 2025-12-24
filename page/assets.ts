import constants from './p_consts';

function decideTheme() {
    const is_dark_mode: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    let storage_theme: string | null = null;
    
    try {
        const theme: string = localStorage.getItem(constants.key.theme) ?? '';
    
        if (getIsValidEnumValue(constants.Theme, theme))
            storage_theme = theme;
    } catch (e) {}

    let selected_theme: string;
    
    if (storage_theme) {
        selected_theme = storage_theme;
    }
    else if (is_dark_mode) {
        selected_theme = constants.Theme.Dark;
        localStorage.setItem(constants.key.theme, constants.Theme.Dark);
    }
    else {
        selected_theme = constants.Theme.Light;
    }

    document.documentElement.setAttribute(constants.key.theme, selected_theme);
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
