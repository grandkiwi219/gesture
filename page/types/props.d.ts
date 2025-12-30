interface Props {
    children: ReactNode
}

interface AppProps extends Props {
    init_nav_state: string;
    init_nav_short_state: boolean;
}

interface NavProps {
    Icon: ReactNode;
    setting: Setting;
}

interface NavMenuProps {
    state: string;
    setState: Function;
}

interface NavWrapProps extends Props {
    state: string;
    setState: Function;
}

interface HeaderProps {
    setNavMenuState: Function;
}

interface Setting {
    name: string;
    path: string;
}
