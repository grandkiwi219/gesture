type Props = { children: ReactNode }

type NavProps = {
    Icon: ReactNode
    setting: Setting,
}

interface NavMenuProps {
    state: string;
    setState: Function;
}

interface NavWrapProps {
    children: ReactNode;
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
