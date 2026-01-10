function decideTheme() {
    let storage_theme = null;
    
    const theme = localStorage.getItem('theme');

    storage_theme = theme == 'dark' || theme == 'light'
        ? theme
        : '';

    let selected_theme;
    
    if (storage_theme) {
        selected_theme = storage_theme;
    }
    else if (/* isDarkMode */window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        selected_theme = 'dark';
        localStorage.setItem('theme', 'dark');
    }
    else {
        selected_theme = 'light';
    }

    document.documentElement.setAttribute('theme', selected_theme);
}

decideTheme();