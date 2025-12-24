type Props = { children: ReactNode }

type NavProps = {
    to: string
    Icon: ReactNode
    children: ReactNode,
}

interface NavMenuProps {
    state: string;
}

interface HeaderProps {
    navMenuState: string;
    setNavMenuState: Function;
}

interface Setting {
    name: string;
    path: string;
}
